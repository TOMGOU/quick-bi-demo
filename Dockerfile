FROM cr.cheanjiait.com/library/nginx-frontend:1.1

COPY nginx/default.conf /etc/nginx/conf.d

COPY www/ /usr/share/nginx/html
