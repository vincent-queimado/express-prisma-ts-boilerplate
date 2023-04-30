<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme-header.png?raw=true" alt="readme-header"/>
</div>

<div align="center">
  <h1>Express RESTful API boilerplate using TypeScript<br/>(Express + Typescript + Sequelize + Jest)</h1>
</div>

<p align="center">
  <span>A starter project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more.</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

![divider](./public/assets/images/readme-divider.png)

## About the boilerplate

This project is a simple and complete boilerplate written in TypeScript to quickly create an Express Rest API.<br />
Use of libraries like Sequelize ORM, log management with Morgan/Winston (logging HTTP requests and rotating log files), unit test coverage with Jest, data validation schemas with Zod, JWT authentication, and other essential packages to start a new custom project.<br />
The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.

## :rocket: Technologies

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Jest](https://jestjs.io/pt-BR/)
-   [Husky](https://github.com/typicode/husky)
-   [lint-staged](https://github.com/okonet/lint-staged)
-   [commitizen](https://github.com/commitizen/cz-cli)

## Getting Started

To install the project, follow the steps below.

#### Clone the Git repository

First, open your terminal and type the necessary commands to download the project and access it.

> [NodeJS](https://nodejs.dev/) is required

```bash
$ git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
```

#### Install the project dependencies

Second, make sure you install all the necessary dependencies to run the project:

```bash
$ cd typescript-express-boilerplate
$ npm install
```

#### Download pgAdmin for the PostgreSQL Database (web based administration tool for PostgreSQL)

If you do not already have the software, download PostgreSQL and pgAdmin and install them.

[PostgreSQL](https://www.postgresql.org/download/) downloads page

#### Create a PostgreSQL server instance

Run pgAdmin. Right-click on the item Servers, select Create -> Server and provide the connection to your PostgreSQL instance set up in step 1. In the default PostgreSQL setup, the administrator user is postgres with an empty password. In the connection tab be sure to have the host set to localhost. Click Save afterwards.

required fields:

-   name
-   HOST name/address

#### Configure your project variables

In the new folder you will find a `.env.example` file, duplicate it and rename it to `.env` only. The command below will copy the template environment variables file needed to initialize your project.<br />

```bash
$ cp .env.example .env
```

After renaming the file, open it and change the desired variables ​​according to your project:

```bash
#.env
APP_URL_HOST='localhost'
APP_URL_PORT='3344'
APP_URL_SSL='false'
...
```

#### Configure your database

You will need to configure a SQL database supported by ORM Sequelize (Oracle, Postgres, MySQL, MariaDB, SQLite, SQL Server, and more) for data storage.

Before running the project, it will be necessary to perform a migration through ORM Sequelize. In this way, the first tables of the project will be created. When executing the reset command, the ORM seed will be called, thus populating some tables:

Migration run command:

```bash
$ npm run migrate
```

Command to undo migrations and run again:

```bash
$ npm run migrate:reset
```

Obs.: Initially, the project assumes that we will use the Postgres database by default, but feel free to change the connection data to the database of your choice.

#### Step 5 - Finally, run the project

Running locally in development environment:

```bash
# development (watch mode)
$ npm run start:dev
```

Running in a production environment (the code will be transpiled in the build folder and executed):

```bash
# production mode
$ npm run start
```

When running locally, by default the API will be accessible at url http://localhost:3344.

## More scripts

The API ships with several convenience commands (runnable via `npm`):

-   `npm run lint`: run code linting
-   `npm run lint:fix`: automatically fix lint problems
-   `npm run format`: automatically fix prettier problems
-   `npm run test`: run functional tests (this requires that the server be running)
-   `npm run test:watch`: run functional tests in watch mode
-   `npm run migrate`: run migration
-   `npm run migrate:undo`: run undo migration
-   `npm run migrate:reset`: run new migration after undo migration
-   `npm run seed`: populate database

## Scope of structure

API service structure summary:

```
build\                    # Transpiled TypeScript code to Javasccript
docs\                     # Documentation / Postman collection / Readme assets
logs\                     # Log files (generate with Winston packages)
node_modules\             # NodeJS packages
public\                   # Public ressources
src\                      # Sources
 |--api\                  # Custom MVC model with extra layers
     |--controllers\      # Controllers
     |--models\           # Models
     |--presenters\       # Presenters
     |--services\         # Services
 |--config\               # Environment variables and configuration related things
     |--app\              # App configuration file
     |--database\         # Database configuration file
     |--email\            # Email configuration file
 |--database\             # Database connection drivers and migration files
     |--sql\              # Sequelize ORM
         |--db\           # Database connection
         |--migrations\   # Database migration
         |--seeders\      # Database seeders
 |--middlewares\          # Middlewares (JWT auth, data validation schema, Morgan, other middlewares)
     |--schemas\          # Data validation schema
 |--server\               # Express server
 |--routes\               # Custom Routes
 |--utils\                # Utility handler, logger, mailer, etc..
 |--app.js                # Entry point
tests\                    # unit test coverage with Jest
```
