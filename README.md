# БУДОГОЩЬ СТОЛИЦА МИРА
### запуск:
из корня проекта -
```docker-compose up --build```

управление:

0) ```docker-compose up --build``` - **docker compose build** + **docker-compose up**
---
1) ```docker-compose up``` - считывает файл docker-compose.yml и запускает определенные в нем сервисы
в фоновом режиме в виде Docker-контейнеров. 
---
2) ```docker-compose down``` - останавливает и удаляет контейнеры, сети и volumes, определенные в файле
docker-compose.yml.
---
3) ```docker compose build``` - собирает или пересобирает Docker образы для сервисов, определенных
в файле docker-compose.yml.
---
4) ```docker-compose ps``` - выводит список контейнеров для сервисов, определенных в файле
docker-compose.yml.



### тесты:
из корня 
```bash 
pytest backend/tests
```

из backend 
``` bash
pytest tests
```