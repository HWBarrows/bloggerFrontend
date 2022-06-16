FROM node:16-alpine

WORKDIR /user/app

COPY package*.json ./

RUN npm install -qy

COPY . .

CMD ["npm", "run", "start"]