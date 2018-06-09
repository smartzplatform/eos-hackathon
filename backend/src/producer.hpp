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

class producer : public eosio::contract {
public:
    producer(account_name self) :
            contract(self)
            {}

};