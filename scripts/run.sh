
docker compose up -d --build 

PGPASSWORD=1234 psql -h localhost -U postgres -c "CREATE DATABASE emailservice;" 

PGPASSWORD=1234 psql -h localhost -U postgres -d emailservice -f $(pwd)/create-email-service.sql

sleep 2

docker exec nodejs npm run test
