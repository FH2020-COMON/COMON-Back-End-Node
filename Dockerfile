FROM node:12

COPY package*.json ./
COPY tsconfig.json ./tsconfig.json  
COPY .env ./.env

RUN npm install

COPY src ./src

RUN npm run build

EXPOSE 3000

CMD npm start