FROM node:22.5.1 AS build

WORKDIR /app/backend

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD ["npx", "ts-node", "src/server.ts"]