#!/bin/bash

set -ex

export FIREBASE_TOKEN=$3

cd $1
yarn install
yarn run "package-functions-$2"

firebase deploy --project $4 --only functions:$5
