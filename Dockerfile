FROM node:latest
MAINTAINER Daniel Lemper

ENV NODE_ENV=production

WORKDIR /usr/src/app
ADD * .

RUN npm i && npm run build

RUN cd client && npm i && npm run build && rm -Rf node_modules && cd ..

CMD ["node", "."]
