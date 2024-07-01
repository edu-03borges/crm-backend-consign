ARG NODE_IMAGE=node:21-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /usr/app && chown node:node /usr/app
WORKDIR /usr/app
USER node
RUN mkdir tmp

USER root
RUN mkdir -p /usr/app/public/assets \
    && chown -R node:node /usr/app/public/assets \
    && chmod -R 755 /usr/app/public/assets
USER node

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /usr/app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
