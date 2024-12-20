FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install && npm run build

EXPOSE 80

CMD ["npm", "start"]