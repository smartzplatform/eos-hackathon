#!/usr/bin/env bash
#
#   Compiles contract
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


[[ $# -eq 2 ]] || die "usage: $0 contract_cpp output_dir"

CONTRACT_CPP="$1"
OUTPUT_DIR="$2"

[[ -n "$CONTRACT_CPP" && -n "$OUTPUT_DIR" ]] || die "usage: $0 contract_cpp output_dir"

CONTRACT_DIR="$(cd "$(dirname "$CONTRACT_CPP")" && pwd)"
CONTRACT_NAME="$(basename "$CONTRACT_CPP" | sed -e 's/\.cpp$//')"

CONTRACT_CPP_BASENAME="$(basename "$CONTRACT_CPP")"
CONTRACT_HPP_BASENAME="$CONTRACT_NAME.hpp"


$EOS_DOCKER run --rm -v "$CONTRACT_DIR":/input -v "$OUTPUT_DIR":/output \
    eosio/eos-dev /opt/eosio/tools/eosiocpp \
    -o /output/"$CONTRACT_NAME.wast" /input/"$CONTRACT_CPP_BASENAME"

echo "WAST: $OUTPUT_DIR/$CONTRACT_NAME.wast"


# if [[ -f "$CONTRACT_DIR/$CONTRACT_HPP_BASENAME" ]]; then
#     ABI_SOURCE="$CONTRACT_HPP_BASENAME"
# else
#    ABI_SOURCE="$CONTRACT_CPP_BASENAME"
# fi

ABI_SOURCE="$CONTRACT_CPP_BASENAME"

$EOS_DOCKER run --rm -v "$CONTRACT_DIR":/input -v "$OUTPUT_DIR":/output \
    eosio/eos-dev /opt/eosio/tools/eosiocpp \
    -g /output/"$CONTRACT_NAME.abi" /input/"$ABI_SOURCE"

echo "ABI: $OUTPUT_DIR/$CONTRACT_NAME.abi"
