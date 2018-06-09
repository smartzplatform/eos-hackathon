//
// Created by Eenae on 09.06.2018.
//

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/currency.hpp>

#include <string>
#include <sstream>
#include <algorithm>
#include <iterator>

#include "billing.hpp"
#include "debug_tools.hpp"


using eosio::asset;
using eosio::const_mem_fun;
using eosio::indexed_by;
using std::string;
using std::istringstream;


class billing_electricity : /*public billing,*/ public eosio::contract {
public:
    billing_electricity(account_name self) :
            contract(self) {}

    // @abi action
    void bill(uint64_t device_data, account_name user2bill, string user_meta, string billing_meta) {
        print_block_start("billing_electricity:bill", device_data, user2bill, user_meta, billing_meta);

        // device_data is a number of measurements sent
        // billing_meta: <float: watts/hour per measurement>\t<uint: payment per kWt/hour>

        //istringstream iss(billing_meta);

        float wattPerMeasurement;
        //iss >> wattPerMeasurement;

        uint64_t paymentPerKWT;
        //iss >> paymentPerKWT;

        eosio::print( "wattPerMeasurement = ", wattPerMeasurement, "  paymentPerKWT = ", paymentPerKWT, "\n" );

        print_block_end("billing_electricity:bill", device_data, user2bill, user_meta, billing_meta);
    }
};


EOSIO_ABI( billing_electricity, (bill) )
