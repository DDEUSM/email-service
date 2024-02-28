FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

ADD . .

RUN npm run build

EXPOSE 4331

CMD ["npm", "run", "start:docker"]
