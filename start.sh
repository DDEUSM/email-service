#!/bin/bash

set -e

host="localhost"

docker compose up -d

PGPASSWORD=1234 psql -h "$host" -U postgres -d postgres -c 'CREATE DATABASE emailservice'

PGPASSWORD=1234 psql -h "$host" -U postgres -d emailservice -c 'CREATE TABLE emails (email_id TEXT PRIMARY KEY NOT NULL, owner_id TEXT UNIQUE, email_from CHAR(150) NOT NULL, email_to CHAR(150) NOT NULL, subject CHAR(220), text TEXT NOT NULL, send_date_email TEXT, email_status INTEGER);'

docker exec nodejs npm run test

docker logs nodejs
