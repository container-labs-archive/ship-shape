#!/bin/bash

set -ex

cd $1
yarn install
yarn run "build-$2"
