FROM python:3

WORKDIR /app

COPY server/mkdocs.yml mkdocs.yml

RUN pip install mkdocs mkdocs-material

CMD ["mkdocs", "serve","-a","0.0.0.0:8000"]
