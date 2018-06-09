#!/usr/bin/env bash
#
#   Executes action on contract
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


[[ $# -ge 1 ]] || die "usage: $0 action_name [action args]"

ACTION_NAME="$1"
shift

[[ -n "$ACTION_NAME" ]] || die "usage: $0 action_name [action args]"


"$BIN_DIR/cleos" push action "$EOS_TEST_ACCOUNT" "$ACTION_NAME" "$@" -p "$EOS_TEST_ACCOUNT"
