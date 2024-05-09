FROM node:20.11.1

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --silent

ADD ./ ./

RUN npm run build

EXPOSE 4331

CMD ["npm", "start"]
