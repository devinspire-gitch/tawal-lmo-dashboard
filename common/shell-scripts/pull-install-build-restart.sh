#!/bin/bash
SCRIPT_PATH=$(dirname "$(readlink -f "$0")")
cd "${SCRIPT_PATH}" && git reset --hard && git pull
cd "${SCRIPT_PATH}/../../back-end/" && npm install && npm rebuild && npm run autoupdate-db && pm2 reload ecosystem.json
cd "${SCRIPT_PATH}/../../front-end/" && (npm install; npm rebuild; npm run build)
