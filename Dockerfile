# production environment
FROM nginx:1.23.3-alpine
COPY nginx.conf /etc/nginx
COPY security-headers.conf /etc/nginx
COPY dist/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]