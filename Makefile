SLUG=ifrondonia-bot
DEV_NETWORK=${SLUG}-net

# playground container
PLAYGROUND_IMAGE=node-pnpm
PLAYGROUND_USER=node
PLAYGROUND_SHELL=bash

# rabbitmq container
RABBITMQ_DEFAULT_USER=user
RABBITMQ_DEFAULT_PASS=pass

dev-net:
	(docker network create $(DEV_NETWORK); exit 0;)

dev-env:
	find . -maxdepth 3 -type f -name \*.env.example -exec bash -c 'cp "{}" -n `dirname "{}"`/`basename "{}" ".example"`' \;

setup:
	make dev-net;
	make dev-env;

dev-rabbitmq:
	make setup;
	clear;	
	docker run --rm \
		--hostname ${SLUG}-rabbitmq \
		--network ${DEV_NETWORK} \
		-p 15672:15672 \
		-p 5672:5672 \
		-e RABBITMQ_DEFAULT_USER=$(RABBITMQ_DEFAULT_USER) \
		-e RABBITMQ_DEFAULT_PASS=$(RABBITMQ_DEFAULT_PASS) \
		rabbitmq:3-management

dev-playground:
	make setup;
	clear;
	docker run --rm \
		--network $(DEV_NETWORK) \
		-u $(PLAYGROUND_USER) \
		-w /code \
		-v $(shell pwd):/code \
		--env-file .env \
		-it $(PLAYGROUND_IMAGE) \
		$(PLAYGROUND_SHELL)
