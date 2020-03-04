FROM node:lts AS build
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/app/dist .
