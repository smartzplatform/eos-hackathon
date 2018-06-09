//
// Created by Eenae on 09.06.2018.
//

#include <eosiolib/eosio.hpp>
#include <eosiolib/currency.hpp>
#include <eosiolib/fixedpoint.hpp>

#include <string>

#include "billing.hpp"
#include "debug_tools.hpp"
#include "common.hpp"
#include "utils.hpp"


using eosio::const_mem_fun;
using eosio::indexed_by;
using eosio::fixed_divide;
using std::string;
using eosio::permission_level;
using common::token_symbol;
using common::decimals;


class billing_electricity : /*public billing,*/ public eosio::contract {
public:
    billing_electricity(account_name self) :
            contract(self) {}

    // @abi action
    void bill(
            account_name supplier_account,
            account_name device_account,
            uint64_t device_data,
            account_name user2bill,
            string user_meta,
            string billing_meta
    ) {
        // device_data is a number of measurements sent
        // billing_meta: <float: watts/hour per measurement>\t<uint: payment per kWt/hour>
        print_block_start("billing_electricity:bill", device_data, user2bill, user_meta, billing_meta);

        require_auth(device_account);
        //todo check permission to call this method

        auto space_pos = billing_meta.find(' ');
        uint64_t wattPerMeasurement = str2uint(billing_meta.substr(0, space_pos));
        uint64_t paymentPerKWT = str2uint(billing_meta.substr(space_pos+1));

        eosio::print( "wattPerMeasurement = ", wattPerMeasurement, "  paymentPerKWT = ", paymentPerKWT, "\n" );

        uint64_t quantity = device_data * wattPerMeasurement * paymentPerKWT/ 1000;
        eosio::action(
                permission_level{ device_account, N(active) },
                supplier_account, N(dopayment),
                std::make_tuple(_self, device_account, user2bill, quantity)
        ).send();

        print_block_end("billing_electricity:bill", device_data, user2bill, user_meta, billing_meta);
    }
};


EOSIO_ABI( billing_electricity, (bill) )
