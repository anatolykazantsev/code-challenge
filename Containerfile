FROM docker.io/node:20-alpine3.18

WORKDIR /app

ADD .yarn/ .yarn/
ADD src/ src/
ADD [".pnp.cjs", ".pnp.loader.mjs", ".yarnrc.yml", "package.json", "tsconfig.json", "yarn.lock", "./"]

RUN apk add --no-cache dumb-init
RUN yarn tsc

ENTRYPOINT ["dumb-init", "--", "yarn", "node", "build/index.js"]
