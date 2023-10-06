npm install --prefix ../
docker build ../ -t local/frontend:latest
docker-compose -f docker-compose-local.yml up