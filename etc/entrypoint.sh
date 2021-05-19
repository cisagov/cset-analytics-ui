#!/bin/sh
echo "Substituting settings"
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json

exec nginx -g 'daemon off;'
