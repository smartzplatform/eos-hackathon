//
// Created by quantum on 09.06.18.
//

#include "supplier.hpp"
#include "debug_tools.hpp"

void supplier::adduser(account_name user_account, std::string description, std::string meta) {
    print_block_start("adduser", user_account, description, meta);
    require_auth( _self );

    auto itr = _users.find( user_account );
    eosio_assert(itr != _users.end(), "adduser:: User already exists");

    _users.emplace( _self, [&]( auto& a ) {
        a.account = user_account;
        a.description = description;
        a.meta = meta;
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

    auto itr = _devices.find( device_account );
    eosio_assert(itr != _devices.end(), "Device already exists");

    _devices.emplace( _self, [&]( auto& a ) {
        a.account = device_account;
        a.user_account = user_account;
        a.rate_id = rate_id;
        a.description = description;
    });

    print_block_end("adddevice", device_account, user_account, rate_id, description);
}

void supplier::addbalance(account_name user_account, asset quantity) {
    print_block_start("addbalance", user_account, quantity);

    require_auth( _self );

    eosio_assert( quantity.symbol == token_symbol, "Wrong symbol" );

    auto itr = _users.find( user_account );
    eosio_assert(itr == _users.end(), "User doesn't exist");

    _users.modify( itr, 0, [&]( auto& a ) {
        a.balance += quantity;
        eosio_assert( a.balance >= quantity, "Overflow detected" );
    });

    print_block_end("addbalance", user_account, quantity);
}

void supplier::subbalance(account_name user_account, asset quantity) {
    eosio_assert(false, "Not implemented");
}

void supplier::devicesignal(account_name device_account, uint64_t data) {
    print_block_start("devicesignal", device_account, data);

    require_auth( device_account );

    auto device_itr = _devices.find( device_account );
    eosio_assert(device_itr == _devices.end(), "Device doesn't registered");

    auto rate_itr = _rates.find( device_itr->rate_id );
    eosio_assert(rate_itr == _rates.end(), "Rate doesn't registered");

    auto user_itr = _users.find( device_itr->user_account );
    eosio_assert(user_itr == _users.end(), "User doesn't registered");

    eosio::action(
            permission_level{ _self, N(active) },
            rate_itr->billing_account, N(bill),
            std::make_tuple(data, device_itr->user_account, user_itr->meta, rate_itr->meta)
    ).send();

    print_block_end("devicesignal", device_account, data);
}

void supplier::dopayment(account_name billing_account, account_name from, asset quantity) {
    print_block_start("dopayment", billing_account, from, quantity);

    require_auth( billing_account );

    //todo check, that billing account for this user
    auto user_itr = _users.find( from );
    eosio_assert(user_itr == _users.end(), "User doesn't registered");

    _users.modify( user_itr, 0, [&]( auto& a ) {
        a.balance -= quantity; //can be negative, debt
    });

    print_block_end("dopayment", billing_account, from, quantity);
}



EOSIO_ABI( supplier, (adduser)(addrate)(adddevice)(addbalance)(devicesignal)(dopayment) )
