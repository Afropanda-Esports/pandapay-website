FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5174

CMD ["pnpm", "exec", "vite", "--host", "0.0.0.0", "--port", "5174"]
