FROM node:12

COPY package*.json ./
COPY tsconfig.json ./tsconfig.json  

RUN npm install

COPY src ./src

RUN npm run build

EXPOSE 3000

CMD npm start