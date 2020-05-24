#!/bin/bash

echo "token is $FIREBASE_TOKEN"


npm run "package-functions-staging"
cd functions
npm install
cd ../
firebase deploy --project libra-staging --only functions
