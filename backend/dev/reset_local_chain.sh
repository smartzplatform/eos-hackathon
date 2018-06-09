#!/usr/bin/env bash
#
#   Removes data of test single-node network
#

set -eu
set -o pipefail

BIN_DIR="$(cd $(dirname $0) && pwd)"

. "$BIN_DIR/_local_chain.incl.sh"


"$BIN_DIR/stop_local_chain.sh" &>/dev/null || true


rm -rf "$EOS_DIR"
