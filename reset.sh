docker compose stop
docker rm nodejs
docker rm mypostgres
docker rmi email-service-nodejs
docker rmi 16-alpine
sudo rm -fR dist
docker compose up -d