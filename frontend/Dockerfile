FROM mhart/alpine-node:latest

 RUN mkdir /app
 WORKDIR /app

 COPY ./package.json /app/package.json
 RUN npm install
 COPY . /app

 # compile the assets
 RUN npm run build-production

 EXPOSE 4000

 CMD ["npm", "start"]
