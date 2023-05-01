<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/readme-header.png?raw=true" alt="readme-header"/>
</div>

<div align="center">
  <h1>Express RESTful API boilerplate using TypeScript<br/>(Express + Typescript + Prisma + Jest)</h1>
</div>

<p align="center">
  <span>A starter project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more.</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

![divider](https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/readme-divider.png)

## :blue_heart: About the boilerplate

This project is a simple and complete boilerplate written in TypeScript to quickly create an **Express Rest API**.<br />

Use of libraries like **Prisma ORM**, log management with **Morgan/Winston** (logging HTTP requests and rotating log files), unit test coverage with **Jest**, data validation schemas with **Zod**, JWT authentication, and other essential packages to start a new custom project.<br />

The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.

This repo is functionality complete.
<br/>


## :rocket: Technologies

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Expressjs](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/docs/getting-started)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)](https://nodemon.io/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
<br/>


## :zap: Getting Started

To install the project, follow the steps below.

### Step 1 - Clone the Git repository

First, to clone the repository, you'll need [Git](https://git-scm.com/downloads) installed on your computer.
From your command line:

```bash
$ git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
```

### Step 2 - Install the project dependencies

Second, to run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Make sure you install all the necessary dependencies to run the project from your command line:

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

Running locally in development environment:</br>

```bash
# development (watch mode)
$ npm run start:dev
```
When running locally, by default the API will be accessible at url http://localhost:3344 as illustrated below.
<div align="left">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/api-running.png?raw=true" 
  width="450"
  alt="console-api-running"/>
</div>
</br>

Running in a production environment (the code will be transpiled in the build folder and executed):</br>

```bash
# production mode
$ npm run start
```

## :electric_plug: Configure a Database

### Option 1 - From the PostgreSQL web based administration tool (pgAdmin)

<details>
<summary>
  <strong>Download and install pgAdmin</strong>
</summary>
  
You will need to configure an SQL database supported by the project's ORM in order to perform the data storage. By default the boilerplate uses a demo connection to the PostgreSql database, but it can be changed to another database supported by the Prisma ORM. If you want to install another database, skip steps 3 and 4.

If you want to continue with the PostgreSQL database but don't have the software yet, then download PostgreSQL and pgAdmin now and install them.

> [PostgreSQL](https://www.postgresql.org/download/) is required

<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/doc/readme/pgAdmin/pgAdmin-tool.jpeg?raw=true" 
  width="650"
  alt="pgAdmin-tool"/>
</div>
  
</details>
<br/>

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
