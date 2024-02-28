docker compose up -d

PGPASSWORD=1234 psql -h "0.0.0.0" -U postgres -c "CREATE DATABASE emailservice"

docker exec -it nodejs npm run test 
