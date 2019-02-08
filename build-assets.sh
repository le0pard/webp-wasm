#!/usr/bin/env bash

cd webp-wasm
./build.sh

cd ../
NODE_ENV=production ./node_modules/.bin/webpack --bail
