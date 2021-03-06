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


#if "$BIN_DIR/cleos" get account supplier &>/dev/null; then
#    die 'Already loaded (supplier found)'
#fi


create_account() {
    local NAME="$1"
    local PRIVATE="$2"
    local PUBLIC="$3"

    "$BIN_DIR/cleos" create account eosio "$NAME" "$PUBLIC" &>/dev/null || true
    "$BIN_DIR/cleos" wallet import "$PRIVATE" &>/dev/null || true
}


create_account supplier '5K8uyLerwF8nw6tnq9DDTK4GGUJDKyaWAPMrTBAy1xGrQvP1z49' 'EOS64wVjdJzSKEBKgt3Lg6TWr97ZG8cQB2BvecCUWyfRpQKK6MQmT'

create_account electricity '5JR2XT3nokVfe5TgDrH8RPdjSC9WnyB1eQSzzus8aWe1FvFsM2Q' 'EOS7oPdzdvbHcJ4k9iZaDuG4Foh9YsjQffTGniLP28FC8fbpCDgr5'

create_account rfidreader '5JERmsYigQaH3us3JkEWWPAxJmBF9cq32d3e6sSLSKVDpNGkhQH' 'EOS6yA6s7jshQPjtE3ir36rSYULmoxmXYVXy2XMnrBfRzuTgnCW2B'
create_account rfiduser1 '5JV8sTXJN9MER8pnYcJZ3WE1vbRQRjmibwvSraX6JFc7BLod8Y8' 'EOS5d5ay4r2Ah2kK2BpXYP3TayPGy95cBSB4CxFULzt7XLgczDdSY'
create_account rfiduser2 '5KenTrMhcrL4khxRb9XgAbSDeWfkoidnRzVJessEhfQGUAYNSQC' 'EOS4uBeFZBUxMcpE4bCXGZVBRDgQoFdoWfP5ChYaqTDegUaeVrEjj'

create_account billelectro '5K6FSD2BKpG6Tzxo48iJQQ6ZgLY8kDuGdjNfnA7niHbdiJDsASx' 'EOS8ZSpHAvVy5zxzp4z39gieesnARgu1yDRj45AxptjovNkMFW6xJ'
create_account billrfid '5J2w4621wvHFLUcNRv3wULHEDV3QeY4z8FV33xxzogD4KJRQDsZ' 'EOS8LFuvw7SN6A13gaPq1GYsZgFexmtTJGpm2xgJXxXg7NVhRMpkQ'


# ./cleos push action supplier adduser '["user1", "descr1", "meta1"]' -p supplier
# ./cleos push action supplier addrate '["simple electro", "billelectro", "100 10"]' -p supplier #billing_meta: <uint: watts/hour per measurement> <uint: payment per kWt/hour>
# ./cleos push action supplier adddevice '["electricity", "user1", 0, "electro counter"]' -p supplier
# ./cleos push action supplier addbalance '["user1", "100000"]' -p supplier


# rdif case:
#
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action billrfid addframe '["rfidreader"]' -p billrfid
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action billrfid addsku '[132353, 55]' -p billrfid
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action billrfid addsku '[13, 100]' -p billrfid
#
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier addrate '["", "billrfid", ""]' -p supplier
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier adduser '["rfiduser1", "", ""]' -p supplier
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier adddevice '["rfiduser1", "rfiduser1", 0, ""]' -p supplier
#
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action eosio updateauth '{"account":"rfiduser1","permission":"active","parent":"owner","auth":{"keys":[{"key":"EOS5d5ay4r2Ah2kK2BpXYP3TayPGy95cBSB4CxFULzt7XLgczDdSY", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"billrfid","permission":"eosio.code"},"weight":1},{"permission":{"actor":"supplier","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p rfiduser1
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action eosio updateauth '{"account":"rfiduser2","permission":"active","parent":"owner","auth":{"keys":[{"key":"EOS4uBeFZBUxMcpE4bCXGZVBRDgQoFdoWfP5ChYaqTDegUaeVrEjj", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"billrfid","permission":"eosio.code"},"weight":1},{"permission":{"actor":"supplier","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p rfiduser2
# buy
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier devicesignal '["rfiduser1", 132353]' -p rfiduser1
#
# it wont be billed so using rfidreader as user
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier adduser '["rfidreader", "", ""]' -p supplier
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier adddevice '["rfidreader", "rfidreader", 0, ""]' -p supplier
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action eosio updateauth '{"account":"rfidreader","permission":"active","parent":"owner","auth":{"keys":[{"key":"EOS6yA6s7jshQPjtE3ir36rSYULmoxmXYVXy2XMnrBfRzuTgnCW2B", "weight":1}],"threshold":1,"accounts":[{"permission":{"actor":"billrfid","permission":"eosio.code"},"weight":1},{"permission":{"actor":"supplier","permission":"eosio.code"},"weight":1}],"waits":[]}}' -p rfidreader
# frame at exit
# NODE_URL='https://api.eos-hackathon.smartz.io/' ./backend/dev/cleos push action supplier devicesignal '["rfidreader", 132353]' -p rfidreader
