# DONT run directly

# settings

EOS_DIR="$HOME/eos-hackathon"
# dont change - workaround for cleos bug https://github.com/EOSIO/eos/issues/3145#issuecomment-395951751https://github.com/EOSIO/eos/issues/3145#issuecomment-395951751
EOS_NETWORK="host"
EOS_DOCKER='docker'

NODEOS_PORT=8888
KEOSD_PORT=8889

EOS_TEST_ACCOUNT='debug'


# computed - dont touch

NODEOS_DATA="$EOS_DIR/nodeos"
KEOSD_DATA="$EOS_DIR/keosd"

EOS_PUB_KEY_FILE="$EOS_DIR/pubkey"


# tools

die() {
    echo $*
    exit 1
}
