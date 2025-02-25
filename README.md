## Стек технологий

- **FastAPI** 
- **React**
- PostgreSQL
- SqlAlchemy с Alembic для миграций
- Docker-compose

### Быстрый старт
1) **Требуется установленный Docker**
2) **Создать .env файл и вписать данные (пример .env.example)**
3) **Из корня проекта прописать:**
```bash
docker-compose up --build
```

### Управление докером

1) ```docker-compose up --build``` - **docker compose build** + **docker-compose up**
2) ```docker-compose up``` - считывает файл docker-compose.yml и запускает определенные в нем сервисы
в фоновом режиме в виде Docker-контейнеров.
3) ```docker-compose down``` - останавливает и удаляет контейнеры, сети и volumes, определенные в файле
docker-compose.yml.
4) ```docker compose build``` - собирает или пересобирает Docker образы для сервисов, определенных
в файле docker-compose.yml.
5) ```docker-compose ps``` - выводит список контейнеров для сервисов, определенных в файле
docker-compose.yml.


### Тесты:
из корня
```bash 
pytest backend/tests
```

из backend 
``` bash
pytest tests
```

### Структура проекта

```
└── mathUP/
    ├── backend/ - серверная часть проекта
    │   ├── src/
    │   │   ├── alembic/ - миграции БД
    │   │   ├── core/ - конфигурация проекта и кеша
    │   │   ├── database/ - инициализация БД и Base DAO
    │   │   ├── users/ - все, что связано с сущностью User
    │   │   ├── backend_pre_start.py
    │   │   └── main.py
    │   ├── tests/ - тесты серверной части
    │   ├── Dockerfile
    │   └── prestart.sh - скрипт, запускающийся перед запуском
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── fonts/
    │   │   ├── hooks/
    │   │   ├── App.jsx
    │   │   ├── index.css
    │   │   └── main.jsx
    │   ├── Dockerfile
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   └── vite.config.js
    └── docker-compose.yml
```
