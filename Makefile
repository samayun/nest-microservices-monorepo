build:
	sudo docker-compose up --build -d

logs-auth:
	sudo docker-compose logs --follow auth

logs-billing:
	sudo docker-compose logs --follow billing

logs-orders:
	sudo docker-compose logs --follow orders