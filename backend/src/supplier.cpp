//
// Created by quantum on 09.06.18.
//

#include "supplier.hpp"

void supplier::adduser(account_name user_account, std::string description, std::string meta) {
    require_auth( _self );

    auto itr = _users.find( user_account );
    eosio_assert(itr != _users.end(), "User already exists");

    _users.emplace( _self, [&]( auto& a ) {
        a.account = user_account;
        a.description = description;
        a.meta = meta;
    });

}

void supplier::addrate(account_name billing_account, string meta) {

}

void supplier::adddevice(account_name device_account, account_name user_account, uint64_t rate_id,
                         std::string description) {

}

void supplier::addbalance(account_name user_account, asset quantity) {

}

void supplier::subbalance(account_name user_account, asset quantity) {

}

void supplier::devicesignal(uint64_t data) {

}

void supplier::dopayment(account_name from, asset quantity) {

}


EOSIO_ABI( supplier, (adduser)(addrate)(adddevice)(addbalance)(devicesignal)(dopayment) )
