setup:
	(cd ../..; make setup;)

start:
	make setup;
	docker-compose up -d

stop:
	docker-compose stop

attach:
	make start;
	docker-compose exec -u node node bash