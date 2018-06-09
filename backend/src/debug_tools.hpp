//
// Created by quantum on 09.06.18.
//

#ifndef EOS_HACK_DEBUG_TOOLS_H
#define EOS_HACK_DEBUG_TOOLS_H

#endif //EOS_HACK_DEBUG_TOOLS_H


static constexpr auto header = "============================= ";

template<typename Arg, typename... Args>
inline void print_block_start(Arg&& a, Args&&... args) {
    eosio::print(header, "START ", std::forward<Arg>(a), ": ");
    // eosio::print("  ", std::forward<Args>(args)...);
    eosio::print("\n");
}

template<typename Arg, typename... Args>
inline void print_block_end(Arg&& a, Args&&... args) {
    eosio::print(header, "END ", std::forward<Arg>(a), ": ");
    //eosio::print(" ", std::forward<Args>(args)...);
    eosio::print("\n");
}

