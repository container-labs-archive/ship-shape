#!/bin/bash

set -ex

cd $1
yarn install
yarn run "package-functions-$2"
