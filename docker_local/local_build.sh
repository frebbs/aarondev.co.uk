npm install --prefix ../
docker build ../ -t local/frontend:latest
PORT=8080 docker-compose -f docker-compose-local.yml up