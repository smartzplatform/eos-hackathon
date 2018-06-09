#!/usr/bin/env bash
#
#   Deployes contract
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


[[ $# -eq 1 ]] || die "usage: $0 contract_wast"

CONTRACT_WAST="$1"

[[ -n "$CONTRACT_WAST" ]] || die "usage: $0 contract_wast"


CONTRACT_DIR="$(cd "$(dirname "$CONTRACT_WAST")" && pwd)"
CONTRACT_NAME="$(basename "$CONTRACT_WAST" | sed -e 's/\.wast$//')"

CONTRACT_WAST_BASENAME="$(basename "$CONTRACT_WAST")"
CONTRACT_ABI_BASENAME="$CONTRACT_NAME.abi"


rm -rf "$MOUNT_DIR"
mkdir -p "$MOUNT_DIR"
cp -a "$CONTRACT_WAST" "$CONTRACT_DIR/$CONTRACT_ABI_BASENAME" "$MOUNT_DIR"

"$BIN_DIR/cleos" set contract "$EOS_TEST_ACCOUNT" /mounted /mounted/"$CONTRACT_WAST_BASENAME" /mounted/"$CONTRACT_ABI_BASENAME"
