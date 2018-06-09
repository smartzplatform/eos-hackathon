//
// Created by Eenae on 09.06.2018.
//

#ifndef EOS_HACKATHON_UTILS_HPP
#define EOS_HACKATHON_UTILS_HPP

#include <string>

uint64_t str2uint(const std::string s) {
    uint64_t value = 0;
    uint64_t multiplier = 1;

    for (std::string::size_type i = s.length() - 1; ; --i) {
        char digit = s[i];
        eosio_assert(digit >= '0' && digit <= '9', "valid decimal digit");

        value += uint64_t(digit - '0') * multiplier;
        multiplier *= 10;

        if (0 == i)
            break;
    }

    return  value;
}

#endif //EOS_HACKATHON_UTILS_HPP
