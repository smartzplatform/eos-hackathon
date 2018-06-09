cmake_minimum_required(VERSION 3.10)
project(eos_hack)

set(CMAKE_CXX_STANDARD 14)

add_executable(eos_hack src/supplier.cpp src/supplier.hpp) # each contract
include_directories(/data/repos/eos/contracts/) # include headers