FROM node:16.16.0-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY security-headers.conf /etc/nginx/security-headers.conf

EXPOSE 80
