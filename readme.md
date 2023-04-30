<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/readme-header.png?raw=true" alt="readme-header"/>
</div>

<div align="center">
  <h1>Express RESTful API boilerplate using TypeScript<br/>(Express + Typescript + Sequelize + Jest)</h1>
</div>

<p align="center">
  <span>A starter project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more.</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

![divider](https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/readme-divider.png)

## :blue_heart: About the boilerplate

This project is a simple and complete boilerplate written in TypeScript to quickly create an Express Rest API.<br />
Use of libraries like Prisma ORM, log management with Morgan/Winston (logging HTTP requests and rotating log files), unit test coverage with Jest, data validation schemas with Zod, JWT authentication, and other essential packages to start a new custom project.<br />
The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.

This repo is functionality complete.

## :rocket: Technologies

-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Prisma](https://www.prisma.io/docs/getting-started)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Jest](https://jestjs.io/pt-BR/)
-   [Husky](https://github.com/typicode/husky)
-   [Lint-staged](https://github.com/okonet/lint-staged)
-   [Commitizen](https://github.com/commitizen/cz-cli)

## :zap: Getting Started

To install the project, follow the steps below.

### Step 1 - Clone the Git repository

First, open your terminal and type the necessary command to download the project and access it.

> [Git](https://git-scm.com/downloads/) is required

```bash
$ git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
```

### Step 2 - Install the project dependencies

Second, in your terminal, make sure you install all the necessary dependencies to run the project.

> [NodeJS](https://nodejs.dev/) is required

```bash
$ cd typescript-express-boilerplate
$ npm install
```

### Step 3 - Configure your project variables

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

### Step 4 - Finally, run the project

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

## Configure a Database

### Option 1 - From the PostgreSQL web based administration tool (pgAdmin)

#### Download and install pgAdmin

You will need to configure an SQL database supported by the project's ORM in order to perform the data storage. By default the boilerplate uses a demo connection to the PostgreSql database, but it can be changed to another database supported by the Prisma ORM. If you want to install another database, skip steps 3 and 4.

If you want to continue with the PostgreSQL database but don't have the software yet, then download PostgreSQL and pgAdmin now and install them.

> [PostgreSQL](https://www.postgresql.org/download/) is required

<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/pgAdmin/pgAdmin-tool.jpeg?raw=true" 
  width="650"
  alt="pgAdmin-tool"/>
</div>

#### Create a PostgreSQL server instance

Run `pgAdmin`. Right-click on the item Servers, select `Create` -> `Server` and provide the connection to your PostgreSQL instance configured in the pgAdmin installation step. In the default PostgreSQL setup, the administrator user is postgres with an empty password. In the connection tab be sure to have the host set to localhost. Click `Save` afterwards.

<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/pgAdmin/psql_create_server.png?raw=true" 
  width="380"
  alt="pgAdmin-create-server-instance"/>
</div>

### Option 2 - From Heroku Postgres add-on

Log into Heroku. The first step to creating a free PostgreSQL database is to log in to Heroku. ...
Create a new Heroku app. Once logged in to Heroku, navigate to the personal app dashboard to create a new Heroku app. ...
Add a PostgreSQL database. ...
Access the database credentials.

## Initialize your database

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

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
