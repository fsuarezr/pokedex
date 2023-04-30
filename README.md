<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en modo desarrollo
1. Clonar el repositorio
2. Ejecutar el comando:
```
npm i
```
3. Tener Nest CLI instalado
```
npm i -g @nest/cli
```
4. Levantar la base de datos
```
docker-compose -f docker-compose.yml up -d --build --force-recreate
```
5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
6. Llenar las variables de entorno definidas en __.env__
7. Ejecutar la aplicación en modo desarrollo con:
```
npm run start:dev
```
8. Ejecutar la migración de Pokemones a la BD
```
http://localhost:3000/api/v2/seed
```


# Ejecutar Build para producción y/o ambiente Cloud
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción.
3. Crear la nueva imagen:
```
docker-compose -f docker-compose.yml up -d --build --force-recreate
```

## Stack usado:
* MongoDB
* Nest
* Docker
* PostgreSQL
