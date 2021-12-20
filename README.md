# My-Backend

This is a sample backend application written with the RestJS framework. MariaDB is used as the RDBMS.

## Installation

```bash
$ npm install
```

## Database

Using MariaDB instead of MySQL due to MacOs compatibility issues
```
docker run --detach --name=my-backend-mysql -p 3306:3306 --env MARIADB_USER=my-backend-user --env MARIADB_PASSWORD=my-backend-password --env MARIADB_ROOT_PASSWORD=rootpass --env MARIADB_DATABASE=my-backend-db --env MARIADB_ROOT_HOST=%  mariadb:latest
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Invoke the APIs

Navigate from a browser to

  http://localhost:3000/api/
