#!/bin/bash

set -ex

export FIREBASE_TOKEN=$3
echo $FIREBASE_TOKEN

# use CI script
firebase-deploy $1 $2
