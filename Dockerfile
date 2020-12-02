FROM node:12

COPY package*.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY openapi.json ./openapi.json

RUN npm run build

EXPOSE 3000

CMD npm run start

