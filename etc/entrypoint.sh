#!/bin/sh
cd /app

# Build is ran at runtime, so cognito config can be defined by environment variables


echo "Substituting settings"
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json

exec nginx -g 'daemon off;'
