//
// Created by quantum on 09.06.18.
//

#ifndef EOS_HACK_PRODUCER_H
#define EOS_HACK_PRODUCER_H

#endif //EOS_HACK_PRODUCER_H


#include <eosiolib/eosio.hpp>
#include <eosiolib/currency.hpp>
#include "common.hpp"
#include <eosiolib/fixedpoint.hpp>

using eosio::const_mem_fun;
using eosio::indexed_by;
using eosio::permission_level;
using std::string;
using common::token_symbol;
using common::max_supply;
using common::decimals;

class supplier : public eosio::contract {
public:
    supplier(account_name self) :
            contract(self),
            _users(_self, _self),
            _devices(_self, _self),
            _rates(_self, _self),
            _logs(_self, _self)
            {}

    // @abi action
    void adduser(account_name user_account, string description, string meta);

    // @abi action
    void addrate(string description, account_name billing_account, string meta);

    // @abi action
    void adddevice(
            account_name device_account,
            account_name user_account,
            uint64_t rate_id,
            string description
    );

    // @abi action
    void addbalance(account_name user_account, uint64_t quantity);

    // @abi action
    void subbalance(account_name user_account, uint64_t quantity);


    // @abi action
    void devicesignal(account_name device_account, uint64_t data);

    // @abi action
    void dopayment(account_name billing_account, account_name device_account, account_name from, uint64_t quantity);

private:
    // @abi table
    struct user {
        account_name account;
        string description;
        string meta;
        int64_t balance;

        uint64_t primary_key()const { return account; }
    };

    // @abi table device i64
    struct device {
        account_name account;
        account_name user_account;
        uint64_t rate_id;
        string description;

        uint64_t primary_key()const { return account; }
        uint64_t by_user() const { return user_account; }
    };

    // @abi table
    struct rate {
        uint64_t rate_id;
        string description;
        account_name billing_account;
        string meta;

        uint64_t primary_key()const { return rate_id; }
    };

    // @abi table log i64
    struct log {
        uint64_t log_id;
        account_name user_account;
        account_name device_account;
        int64_t balance_diff;
        int64_t final_balance;
        uint64_t rate_id;

        uint64_t primary_key()const { return log_id; }
    };


    eosio::multi_index< N(user), user > _users;
    eosio::multi_index<
            N(device), device,
            indexed_by< N(byuser), const_mem_fun<device, uint64_t, &device::by_user> >
    > _devices;
    eosio::multi_index< N(rate), rate > _rates;
    eosio::multi_index< N(log), log > _logs;
};