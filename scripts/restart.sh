docker stop $(docker ps -a -q)

docker rm $(docker ps -a -q)

docker rmi $(docker images -q)

docker network rm email-service_my-docker-net

sudo rm -fR ./dist 




