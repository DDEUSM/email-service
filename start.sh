#!/bin/bash

set -e

docker compose up -d

docker-compose exec -T nodejs npm run test

docker-compose logs nodejs
