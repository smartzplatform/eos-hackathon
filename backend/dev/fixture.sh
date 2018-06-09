#!/usr/bin/env bash
#
#   Loads test fixture (account, etc) to nodeos
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"

if [[ $# -ge 1 ]]; then
    export NODE_URL="$1"
fi


if "$BIN_DIR/cleos" get account supplier &>/dev/null; then
    die 'Already loaded (supplier found)'
fi


create_account() {
    local NAME="$1"
    local PRIVATE="$2"
    local PUBLIC="$3"

    "$BIN_DIR/cleos" create account eosio "$NAME" "$PUBLIC"
}


create_account supplier '5K8uyLerwF8nw6tnq9DDTK4GGUJDKyaWAPMrTBAy1xGrQvP1z49' 'EOS64wVjdJzSKEBKgt3Lg6TWr97ZG8cQB2BvecCUWyfRpQKK6MQmT'
create_account electricity '5JR2XT3nokVfe5TgDrH8RPdjSC9WnyB1eQSzzus8aWe1FvFsM2Q' 'EOS7oPdzdvbHcJ4k9iZaDuG4Foh9YsjQffTGniLP28FC8fbpCDgr5'
create_account rfidreader '5JERmsYigQaH3us3JkEWWPAxJmBF9cq32d3e6sSLSKVDpNGkhQH' 'EOS6yA6s7jshQPjtE3ir36rSYULmoxmXYVXy2XMnrBfRzuTgnCW2B'

