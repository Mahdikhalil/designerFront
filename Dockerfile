### STAGE 1: Build ###
FROM node:16-alpine AS build
# create directory app
WORKDIR /usr/src/app
# copy package.json to install dependencies
COPY package.json package-lock.json ./
# install project dependencies
RUN npm -g install npm@6.14.17
RUN npm install
# copy project source code
COPY . .
# build project
RUN npm install -g @angular/cli@10.0.0
RUN ng build --configuration=production

### STAGE 2: Run ###
FROM nginx:1.21-alpine
# copy nginx config file
COPY nginx.conf /etc/nginx/nginx.conf
# copy build directory
COPY --from=build /usr/src/app/dist/login-app /usr/share/nginx/html
# expose nginx port
EXPOSE 80
