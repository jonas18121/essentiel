# ESSentiel
**Plateforme collaborative COLLECTIF d’ACTEURS JEUNESSE et ESS**

Cette plateforme sera utilisée par les membres du collectif jeunesse et ESS en Aquitaine dans le respect des règles édités dans la charte du collectif et administré par la CRESS NA. Il aura vocation à être utilisé par les membres des 2 autres collectifs en Poitou-Charentes et Limousin.

## Installation (via Docker)

Importer les images de l'API et du client web.
```
docker pull docker.pkg.github.com/alcinae/essentiel/server:latest
docker pull docker.pkg.github.com/alcinae/essentiel/client:latest
```

Lancez-les
```
docker run -p 8080:8080 docker.pkg.github.com/alcinae/essentiel/server
docker run -p 4200:4200 docker.pkg.github.com/alcinae/essentiel/client
```

L'API sera disponible sur <a href="http://localhost:8080/api/">localhost:8080/api</a> (voir <a href="https://alcinae.github.io/essentiel/">documentation</a>)

La plateforme web sera accessible depuis <a href="http://localhost:4200">localhost:4200</a>
