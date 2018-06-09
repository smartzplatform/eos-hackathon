//
// Created by quantum on 09.06.18.
//

#include "supplier.hpp"

void supplier::add_user(account_name user_account, std::string description, std::string meta) {

}

void supplier::add_rate(account_name billing_account, string meta) {

}

void supplier::add_device(account_name device_account, account_name user_account, uint64_t rate_id,
                          std::string description) {

}

void supplier::add_to_balance(account_name user_account, asset quantity) {

}

void supplier::sub_from_balance(account_name user_account, asset quantity) {

}

void supplier::device_signal(uint64_t data) {

}

void supplier::collect_payment(account_name from, asset quantity) {

}
