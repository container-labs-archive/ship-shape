#!/bin/bash

echo "token is $FIREBASE_TOKEN"


yarn run package-functions-staging
c#d functions
#yarn install
#cd ../
firebase deploy --project gpt-staging --only functions:butler
