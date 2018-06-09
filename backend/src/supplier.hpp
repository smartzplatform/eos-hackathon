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

class supplier : public eosio::contract {
public:
    supplier(account_name self) :
            contract(self)
            {}

    // @abi action
    void add_device(account_name device_account, account_name billing_contract, account_name user_account);

    // @abi action
    void add_user(account_name user_account, std::string description);

    // @abi action
    void add_to_balance(account_name user_account, asset quantity);

    // @abi action
    void sub_from_balance(account_name user_account, asset quantity);


    // @abi action
    void device_signal(uint64_t payload);
};