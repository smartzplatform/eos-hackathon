# DONT run directly

# settings

EOS_DIR="$HOME/eos-hackathon"
# dont change - workaround for cleos bug https://github.com/EOSIO/eos/issues/3145#issuecomment-395951751https://github.com/EOSIO/eos/issues/3145#issuecomment-395951751
EOS_NETWORK="host"
EOS_DOCKER='docker'

NODEOS_PORT=8888
KEOSD_PORT=8889


# computed - dont touch

NODEOS_DATA="$EOS_DIR/nodeos"
KEOSD_DATA="$EOS_DIR/keosd"

