FROM node:7.4.0

RUN mkdir /app
RUN mkdir /tmp/app

COPY ./client /tmp/app/client
COPY ./server /tmp/app/server

WORKDIR /tmp/app/client
RUN npm install
RUN npm run build
RUN cp -r /tmp/app/client/build /app/public

WORKDIR /tmp/app/server
RUN npm install
RUN cp /tmp/app/server/package.json /app
RUN cp -r /tmp/app/server/node_modules /app
RUN cp -r /tmp/app/server/src/* /app

WORKDIR /app
EXPOSE 8000

CMD ["npm", "start"]
