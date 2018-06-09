#!/usr/bin/env bash
#
#   Starts test single-node network
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


mkdir -p "$EOS_DIR"
mkdir -p "$NODEOS_DATA"
mkdir -p "$KEOSD_DATA"


set -x

$EOS_DOCKER network create "$EOS_NETWORK"

$EOS_DOCKER run --rm -d --network "$EOS_NETWORK" --name nodeos -v "$NODEOS_DATA":/data \
    eosio/eos-dev /opt/eosio/bin/nodeos \
    -d /data \
    --http-server-address=0.0.0.0:8888 \
    -e -p eosio --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin

$EOS_DOCKER run --rm -d --network "$EOS_NETWORK" --name keosd -v "$KEOSD_DATA":/data \
    eosio/eos-dev /opt/eosio/bin/keosd \
    -d /data \
    --http-server-address=0.0.0.0:8888 \

set +x


sleep 2

EOS_KEY=$("$BIN_DIR/cleos" create key | perl -ne 'print $1 if /^Private key:\s+([^\s]+)/')


echo OK
