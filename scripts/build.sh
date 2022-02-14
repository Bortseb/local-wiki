#!/bin/bash

# ui
rm -rf electron/web
npm run web-build
cp -r web/dist electron/web

# build the electron application
cd electron
npm run build

