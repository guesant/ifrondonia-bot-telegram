FROM node:lts as builder

RUN npm install -g pnpm@next-7

COPY . /tmp-code-raw
WORKDIR /tmp-code-raw

# install all dependencies
RUN pnpm install --frozen-lockfile

# build all projects
RUN NODE_ENV=production pnpm run build

# reset the pnpm virtual store
RUN rm -rf node_modules/.pnpm

# install production dependencies
RUN pnpm install --frozen-lockfile --prod

FROM node:lts-alpine as base-node-service

COPY --from=builder /tmp-code-raw/services /code/services
COPY --from=builder /tmp-code-raw/packages /code/packages
COPY --from=builder /tmp-code-raw/node_modules /code/node_modules
USER node
CMD [ "npm", "run", "start" ]

FROM base-node-service as bot-feed-observer-service
WORKDIR /code/services/bot-feed-observer-service

FROM base-node-service as bot-observer-service
WORKDIR /code/services/bot-observer-service

FROM base-node-service as bot-service
WORKDIR /code/services/bot-service

FROM base-node-service as users-preferences-service
WORKDIR /code/services/users-preferences-service
