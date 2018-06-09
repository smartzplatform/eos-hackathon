//
// Created by Eenae on 10.06.2018.
//

#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/currency.hpp>

#include <string>

#include "billing.hpp"
#include "debug_tools.hpp"
#include "common.hpp"
#include "utils.hpp"


using eosio::asset;
using eosio::const_mem_fun;
using eosio::indexed_by;
using std::string;
using eosio::permission_level;
using common::token_symbol;


/*
 * Work scheme is the following:
 * 1. Supplier creates this billing contract and adds it to a supplier contract
 * 2. Supplier adds frame accounts to this contract and installs frames in a shop
 * 3. Supplier chips all goods with rfids and adds their accounts to this contract
 * 4. Customer buys good by simply scanning it's rfid
 * 5. Customer heads to shop exit and is being scanned by frame to confirm that all goods in his bag were bought
 */
class billing_rfid : /*public billing,*/ public eosio::contract {
public:
    billing_rfid(account_name self) :
            contract(self),
            _skus(_self, _self),
            _frames(_self, _self)
    {}

    // @abi action
    void bill(
            account_name supplier_account,
            account_name device_account,
            uint64_t device_data,
            account_name user2bill,
            string user_meta,
            string billing_meta
    ) {
        print_block_start("billing_rfid:bill", device_account, device_data, user2bill, user_meta, billing_meta);

        require_auth(device_account);
        //todo check permission to call this method

        auto sku_itr = _skus.find(device_data);

        if (_frames.find(device_account) == _frames.end()) {
            // It's customer scanned rfid with his phone - triggering payment.
            eosio_assert(sku_itr != _skus.end(), "SKU is not found");
            asset quantity = asset(sku_itr->price, token_symbol);

            eosio::action(
                    permission_level{ device_account, N(active) },
                    supplier_account, N(dopayment),
                    std::make_tuple(_self, device_account, user2bill, quantity)
            ).send();
            _skus.erase(sku_itr);   // sold!
        }
        else {
            // It's a sku being transferred near frame to the exit.
            // Failed tx - is a signal to stop customer.
            eosio_assert(sku_itr == _skus.end(), "Did't pay for this SKU!");
        }

        print_block_end("billing_rfid:bill", device_account, device_data, user2bill, user_meta, billing_meta);
    }

    // @abi action
    void add_sku(uint64_t id, uint64_t price) {
        require_auth( _self );

        eosio_assert(_skus.find(id) == _skus.end(), "SKU already registered");

        _skus.emplace(_self, [&]( auto& rec ) {
            rec.id = id;
            rec.price = price;
        });
    }

    // @abi action
    void remove_sku(uint64_t id) {
        require_auth( _self );

        auto it = _skus.find(id);
        eosio_assert(it != _skus.end(), "SKU is not found");

        _skus.erase(it);
    }

    // @abi action
    void add_frame(account_name id) {
        require_auth( _self );

        eosio_assert(_frames.find(id) == _frames.end(), "Frame already registered");

        _frames.emplace(_self, [&]( auto& rec ) {
            rec.id = id;
        });
    }

    // @abi action
    void remove_frame(account_name id) {
        require_auth( _self );

        auto it = _frames.find(id);
        eosio_assert(it != _frames.end(), "Frame is not found");

        _frames.erase(it);
    }


private:
    // stock keeping unit
    struct sku {
        uint64_t id;
        uint64_t price;

        uint64_t primary_key()const { return id; }
    };

    // frame in a supermarket
    struct frame {
        account_name id;

        account_name primary_key() const { return id; }
    };


    eosio::multi_index<N(sku), sku > _skus;
    eosio::multi_index<N(frame), frame > _frames;
};


EOSIO_ABI( billing_rfid, (bill)(add_sku)(remove_sku)(add_frame)(remove_frame) )
