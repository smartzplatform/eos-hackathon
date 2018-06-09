//
// Created by quantum on 09.06.18.
//

#ifndef EOS_HACK_PRODUCER_H
#define EOS_HACK_PRODUCER_H

#endif //EOS_HACK_PRODUCER_H


#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/currency.hpp>


using eosio::asset;
using eosio::const_mem_fun;
using eosio::indexed_by;

class supplier : public eosio::contract {
public:
    supplier(account_name self) :
            contract(self),
            _users(_self, _self),
            _devices(_self, _self)
            {}

    // @abi action
    void add_user(account_name user_account, std::string description, std::string meta);

    // @abi action
    void add_device(
            account_name device_account,
            account_name billing_contract,
            account_name user_account,
            std::string description,
            std::string meta
    );

    // @abi action
    void add_to_balance(account_name user_account, asset quantity);

    // @abi action
    void sub_from_balance(account_name user_account, asset quantity);


    // @abi action
    void device_signal(uint64_t data);

    // @abi action
    void collect_payment(account_name from, asset quantity);

private:
    // @abi table
    struct user {
        account_name account;
        std::string description;
        std::string meta;
        asset balance;

        uint64_t primary_key()const { return account; }
    };

    // @abi table
    struct device {
        account_name account;
        account_name user_account;
        uint64_t rate_id;
        std::string description;

        uint64_t primary_key()const { return account; }
        uint64_t by_user() const { return user_account; }
    };

    // @abi table
    struct rate {
        uint64_t rate_id;
        account_name billing_account;
        std::string meta;

        uint64_t primary_key()const { return rate_id; }
    };


    eosio::multi_index< N(user), user > _users;
    eosio::multi_index<
            N(device), device,
            indexed_by< N(byuser), const_mem_fun<device, uint64_t, &device::by_user> >
    > _devices;
};