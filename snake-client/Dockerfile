FROM node:lts AS build
WORKDIR /usr/app
COPY . .
RUN npm install && npm run build

FROM nginx:stable
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/app/dist .
