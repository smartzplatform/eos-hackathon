//
// Created by Eenae on 09.06.2018.
//

#ifndef EOS_HACKATHON_DEVICE_STRUCTS_HPP
#define EOS_HACKATHON_DEVICE_STRUCTS_HPP

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

#include <string>

using eosio::asset;
using std::string;


// listens to TX from devices
class device_listener : public eosio::contract {
public:
    device_listener(account_name self)
            : contract(self), _accounts(_self, _self) {}

    // @abi action
    void device_signal(uint64_t payload);
};


// billing subcontract
class billing : public eosio::contract {
public:
    device_listener(account_name self)
    : contract(self), _accounts(_self, _self) {}

    // @abi action
    void bill(uint64_t payload, account_name user2bill, string user_meta);
};


// listens to callbacks from billing subcontracts
class billing_listener : public eosio::contract {
public:
    device_listener(account_name self)
            : contract(self), _accounts(_self, _self) {}

    // @abi action
    void collect_payment(account_name from, asset quantity);
};


#endif //EOS_HACKATHON_DEVICE_STRUCTS_HPP
