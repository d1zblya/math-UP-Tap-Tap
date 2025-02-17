FROM python:3.12-alpine

WORKDIR /app
ENV PYTHONPATH=/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#COPY ./src /app/src
#
#EXPOSE 8000
#
#CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

COPY ./src /app/src
COPY prestart.sh /app/prestart.sh
COPY alembic.ini /app/alembic.ini

RUN chmod +x /app/prestart.sh

EXPOSE 8000

ENTRYPOINT ["/app/prestart.sh"]
#CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
