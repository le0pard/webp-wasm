#!/usr/bin/env bash

LIBWEBP_DIR="libwebp"
LIBWEBP_VERSION="v1.0.2"

git clone https://github.com/webmproject/libwebp $LIBWEBP_DIR
git --git-dir=$LIBWEBP_DIR/.git --work-tree=$LIBWEBP_DIR checkout $LIBWEBP_VERSION

emcc -O3 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s ABORTING_MALLOC=0 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -o webp.js \
    -I libwebp \
    webp.c \
    $LIBWEBP_DIR/src/{dec,dsp,demux,enc,mux,utils}/*.c

mv webp.{js,wasm} ../source/
