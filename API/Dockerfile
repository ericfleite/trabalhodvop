# Etapa 1 - Build da aplicação
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

# Compila TypeScript → JavaScript
RUN npm run build

# Etapa 2 - Execução
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000
CMD ["node", "dist/index.js"]

