//
// Created by quantum on 09.06.18.
//

#ifndef EOS_HACK_PRODUCER_H
#define EOS_HACK_PRODUCER_H

#endif //EOS_HACK_PRODUCER_H


#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/currency.hpp>

static constexpr uint64_t token_symbol = S(4, SUPPL); // precision, symbol


using eosio::asset;
using eosio::const_mem_fun;
using eosio::indexed_by;
using std::string;

class supplier : public eosio::contract {
public:
    supplier(account_name self) :
            contract(self),
            _users(_self, _self),
            _devices(_self, _self),
            _rates(_self, _self)
            {}

    // @abi_action
    void adduser(account_name user_account, string description, string meta);

    // @abi_action
    void addrate(string description, account_name billing_account, string meta);

    // @abi action
    void adddevice(
            account_name device_account,
            account_name user_account,
            uint64_t rate_id,
            string description
    );

    // @abi action
    void addbalance(account_name user_account, asset quantity);

    // @abi action
    void subbalance(account_name user_account, asset quantity);


    // @abi action
    void devicesignal(uint64_t data);

    // @abi action
    void dopayment(account_name from, asset quantity);

private:
    // @abi table
    struct user {
        account_name account;
        string description;
        string meta;
        asset balance;

        uint64_t primary_key()const { return account; }
    };

    // @abi table
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


    eosio::multi_index< N(user), user > _users;
    eosio::multi_index<
            N(device), device,
            indexed_by< N(byuser), const_mem_fun<device, uint64_t, &device::by_user> >
    > _devices;
    eosio::multi_index< N(rate), rate > _rates;
};