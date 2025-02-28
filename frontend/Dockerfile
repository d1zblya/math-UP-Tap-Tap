FROM node:18-bullseye as builder


WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Используем легковесный образ для статических файлов
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]