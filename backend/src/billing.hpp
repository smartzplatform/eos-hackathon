//
// Created by Eenae on 09.06.2018.
//

#ifndef EOS_HACKATHON_BILLING_HPP
#define EOS_HACKATHON_BILLING_HPP

#include <string>

using std::string;


class billing {
    // @abi action
    void bill(uint64_t device_data, account_name user2bill, string user_meta, string billing_meta) = 0;
};


#endif //EOS_HACKATHON_BILLING_HPP
