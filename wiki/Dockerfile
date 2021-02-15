FROM python:2.7

COPY ../server/docs ./docs

WORKDIR /docs

RUN pip install mkdocs mkdocs-material

EXPOSE 8000

CMD ["mkdocs", "serve","-a","0.0.0.0"]