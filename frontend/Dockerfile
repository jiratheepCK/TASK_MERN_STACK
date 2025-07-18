FROM node:22.5.1 AS build

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls -la /app/frontend/build

FROM nginx:alpine

COPY --from=build /app/frontend/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]