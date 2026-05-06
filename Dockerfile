FROM node:20-alpine

WORKDIR /app

COPY dist ./dist
COPY serve-dist.mjs ./serve-dist.mjs

EXPOSE 5174

CMD ["node", "serve-dist.mjs"]
