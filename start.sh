#!/bin/bash

set -e

docker compose up -d

IP_ADDRESS=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mypostgres)

echo "The IP address of $CONTAINER_NAME is $IP_ADDRESS"

PGPASSWORD=1234 psql -h "$IP_ADDRESS" -U postgres -d postgres -c 'CREATE DATABASE emailservice'

PGPASSWORD=1234 psql -h "$IP_ADDRESS" -U postgres -d emailservice -c 'CREATE TABLE emails (email_id TEXT PRIMARY KEY NOT NULL, owner_id TEXT UNIQUE, email_from CHAR(150) NOT NULL, email_to CHAR(150) NOT NULL, subject CHAR(220), text TEXT NOT NULL, send_date_email TEXT, email_status INTEGER);'

docker-compose exec -T nodejs npm run test

docker-compose logs nodejs
