#!/usr/bin/env bash
#
#   Stops test single-node network
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


set -x


$EOS_DOCKER stop keosd || true
$EOS_DOCKER stop nodeos || true

if [[ "$EOS_NETWORK" != "host" ]]; then
    $EOS_DOCKER network rm "$EOS_NETWORK" || true
fi


set +x

echo OK
