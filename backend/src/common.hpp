//
// Created by quantum on 09.06.18.
//

#ifndef EOS_HACK_COMMON_H
#define EOS_HACK_COMMON_H



#include <eosiolib/eosio.hpp>
#include <eosiolib/symbol.hpp>

namespace common {

    static constexpr uint64_t token_symbol = S(4, SUPPL); // precision, symbol
    static constexpr uint64_t max_supply = 1000000000;
    static constexpr uint64_t decimals = 4;

}

#endif //EOS_HACK_COMMON_H