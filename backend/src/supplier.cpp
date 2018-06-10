//
// Created by quantum on 09.06.18.
//

#include "supplier.hpp"
#include "debug_tools.hpp"

void supplier::adduser(account_name user_account, std::string description, std::string meta) {
    print_block_start("adduser", user_account, description, meta);
    require_auth( _self );

    auto itr = _users.find( user_account );
    eosio_assert(itr == _users.end(), "adduser:: User already exists");

    _users.emplace( _self, [&]( auto& a ) {
        a.account = user_account;
        a.description = description;
        a.meta = meta;
        a.balance = 0;
    });

    print_block_end("adduser", user_account, description, meta);
}

void supplier::addrate(string description, account_name billing_account, string meta) {
    print_block_start("addrate", description, billing_account, meta);
    require_auth( _self );

    //
    _rates.emplace( _self, [&]( auto& a ) {
        a.rate_id = _rates.available_primary_key();
        a.description = description;
        a.billing_account = billing_account;
        a.meta = meta;
    });

    print_block_end("addrate", description, billing_account, meta);
}

void supplier::adddevice(account_name device_account, account_name user_account, uint64_t rate_id,
                         string description) {
    print_block_start("adddevice", device_account, user_account, rate_id, description);

    require_auth( _self );

    auto device_itr = _devices.find( device_account );
    eosio_assert(device_itr == _devices.end(), "Device already exists");

    auto user_itr = _users.find( user_account );
    eosio_assert(user_itr != _users.end(), "User doesn't exists");

    auto rate_itr = _rates.find( rate_id );
    eosio_assert(rate_itr != _rates.end(), "Rate doesn't exists");

    _devices.emplace( _self, [&]( auto& a ) {
        a.account = device_account;
        a.user_account = user_account;
        a.rate_id = rate_id;
        a.description = description;
    });

    print_block_end("adddevice", device_account, user_account, rate_id, description);
}

void supplier::addbalance(account_name user_account, uint64_t quantity) {
    print_block_start("addbalance", get_acc(user_account), quantity);

    require_auth( _self );

    auto itr = _users.find( user_account );
    eosio_assert(itr != _users.end(), "User doesn't exist");

    _users.modify( itr, 0, [&]( auto& a ) {
        a.balance = a.balance + quantity;
        eosio_assert( a.balance >= quantity, "Overflow detected" );
    });

    print_block_end("addbalance", get_acc(user_account), quantity);
}

void supplier::subbalance(account_name user_account, uint64_t quantity) {
    eosio_assert(false, "Not implemented");
}

void supplier::devicesignal(account_name device_account, uint64_t data) {
    print_block_start("devicesignal", get_acc(device_account), data);

    require_auth( device_account );

    auto device_itr = _devices.find( device_account );
    eosio_assert(device_itr != _devices.end(), "Device doesn't registered");

    auto rate_itr = _rates.find( device_itr->rate_id );
    eosio_assert(rate_itr != _rates.end(), "Rate doesn't registered");

    auto user_itr = _users.find( device_itr->user_account );
    eosio_assert(user_itr != _users.end(), "User doesn't registered");

//    eosio::name nm={rate_itr->billing_account};
//    eosio::print(nm.to_string().c_str());//billelectro

    eosio::action(
            permission_level{ device_account, N(active) },
            rate_itr->billing_account, N(bill),
            std::make_tuple(_self, device_account, data, device_itr->user_account, user_itr->meta, rate_itr->meta)
    ).send();

    print_block_end("devicesignal", get_acc(device_account), data);
}

void supplier::dopayment(account_name billing_account, account_name device_account, account_name from, uint64_t quantity) {
    print_block_start("dopayment", get_acc(billing_account), get_acc(from), quantity);

    require_auth( device_account );
    //todo check permissions

    //todo check, that billing account for this user
    auto user_itr = _users.find( from );
    eosio_assert(user_itr != _users.end(), "User doesn't registered");

    auto device_itr = _devices.find( device_account );
    eosio_assert(device_itr != _devices.end(), "Device doesn't registered");

    _users.modify( user_itr, 0, [&]( auto& a ) {
        a.balance = a.balance - int64_t(quantity); //can be negative, debt
    });

    _logs.emplace( _self, [&]( auto& a ) {
        uint64_t pk = 1000000;
        auto itr = _logs.find(1000000);
        if (itr != _logs.end()) {
            auto it = _logs.begin();
            pk = it->primary_key()-1;
        }


        a.log_id = pk;
        a.user_account = from;
        a.device_account = device_account;
        a.balance_diff = - int64_t(quantity);

        a.rate_id = device_itr->rate_id;
        a.final_balance = user_itr->balance;
    });

    print_block_end("dopayment1", get_acc(billing_account), get_acc(from), quantity);
}



EOSIO_ABI( supplier, (adduser)(addrate)(adddevice)(addbalance)(devicesignal)(dopayment) )
