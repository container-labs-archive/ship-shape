FROM containerlabs/node-ci:latest

RUN mkdir /app
WORKDIR /app
# production, staging, etc...
ARG BUILD_ENV

COPY package.json /app/package.json
RUN npm install

COPY ./ /app

# RUN npm run "package-functions-$BUILD_ENV"
# RUN npm run package-functions-production

ENV HOST localhost
ENV PORT 5000

CMD ["npm", "run", "start-docker-prod"]
