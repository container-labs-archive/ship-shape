#!/bin/bash

set -ex

# TODO: use CI script
#firebase-deploy $1 $2

export FIREBASE_TOKEN=$3
#echo "token is $FIREBASE_TOKEN"

cd $1
yarn install
yarn run "package-functions-$2"
#cd functions
#npm install
#cd ../
# can we run thi
#yarn run "deploy-$2"
firebase deploy --project $5 --only functions:$6
