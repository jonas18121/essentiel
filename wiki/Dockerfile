FROM python:3

WORKDIR /app

COPY server/mkdocs.yml .

RUN mkdir docs

COPY server/docs ./docs

RUN pip install mkdocs mkdocs-material

EXPOSE 8000

CMD ["mkdocs", "serve","-a","0.0.0.0:8000"]