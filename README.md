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

## Configure Database
Update '/ormconfig.json' - ensure all environments are up to date.

WARNING: For development environments, ensure the "dev" entry has correct settings for your local SQL server.

## DB Migrations

WARNING: Make sure you followed steps at "Configure Database" section.
### Execute migrations
Before starting a project, migrations must be executed in order to bring the DB to a state that the current version of the code expects to find.

```
 ts-node --transpile-only ./node_modules/typeorm/cli.js  migration:run -c <env>
```
e.g. for "dev" connection : 
```
 ts-node --transpile-only ./node_modules/typeorm/cli.js  migration:run -c dev
```

### Revent migrations
In case you want to revert a migration, execute

```
 ts-node --transpile-only ./node_modules/typeorm/cli.js  migration:revert -c <env>
```
e.g. for "dev" connection : 
```
 ts-node --transpile-only ./node_modules/typeorm/cli.js  migration:revert -c dev
```

### Create a new migration
When a feature requires a DB change, this should be reflected as a new migration. 

From the cli, execute:

```
npx typeorm migration:create -n <name of the migration>
```
e.g. 
```
npx typeorm migration:create -n MyMigration
```

then locate the "<timestamp>-MyMigration.ts" file and ensure 

 1. it is placed under src/database/migration
 2. it contains all the required creation (up) and destruction (down) SQL queries.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Health endpoints

Health status may be retrieved at

```http://localhost:3000/health```


### OpenAPI definitions

Navigate from a browser to

  http://localhost:3000/api/


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Lint

Before commiting, ensure lint produces no errors/warnings

```
npm run lint
```