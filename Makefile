build:
	sudo docker-compose up --build -d

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
	docker-compose exec orders sh