build:
	sudo docker-compose up --build -d

logs:
	sudo docker-compose logs

logs-auth:
	sudo docker-compose logs --follow auth

logs-billing:
	sudo docker-compose logs --follow billing

logs-orders:
	sudo docker-compose logs --follow orders

shell-auth:
	docker-compose exec auth sh

shell-billing:
	docker-compose exec billing sh

shell-orders:
	docker-compose exec orders 
	

######################
###  DEVELOPMENT   ###
######################


destroy:
	sudo rm -rf dist docker node_modules && docker-compose  down --volumes

lint:
	docker-compose  exec api npm run lint

keygen:
	docker-compose  exec api npm run keygen


start:
	docker-compose  up --detach

stop:
	docker-compose  stop

shell:
	docker-compose  exec api sh

install:
	npm install

kill:
	sudo killall node
	
kill-docker:
	docker kill $(docker ps -q)
