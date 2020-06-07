#!/bin/bash

set -ex

export FIREBASE_TOKEN=$4

cd $1
yarn install
yarn run "build-$2"

firebase deploy --project $3 --only hosting
