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

create_account billelectro '5K6FSD2BKpG6Tzxo48iJQQ6ZgLY8kDuGdjNfnA7niHbdiJDsASx' 'EOS8ZSpHAvVy5zxzp4z39gieesnARgu1yDRj45AxptjovNkMFW6xJ'
create_account billrfid '5J2w4621wvHFLUcNRv3wULHEDV3QeY4z8FV33xxzogD4KJRQDsZ' 'EOS8LFuvw7SN6A13gaPq1GYsZgFexmtTJGpm2xgJXxXg7NVhRMpkQ'
