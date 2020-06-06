#!/bin/bash

set -ex

# TODO: use CI script
#firebase-deploy $1 $2

export FIREBASE_TOKEN=$3
echo "token is $FIREBASE_TOKEN"

cd $1
npm install
npm run "package-functions-$2"
cd functions
npm install
cd ../
firebase deploy --project $5 --only functions:$6
