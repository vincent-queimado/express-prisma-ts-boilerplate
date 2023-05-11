<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/readme-header.png?raw=true" alt="readme-header"/>
</div>

<div align="center">
  <h1>Express RESTful API boilerplate using TypeScript<br/>(Express + Typescript + Prisma + Jest)</h1>
</div>

<p align="center">
  <span>A starter project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more.</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

![divider](https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/readme-divider.png)

## :blue_heart: About the boilerplate

This project is a simple and complete boilerplate written in TypeScript to quickly create an **Express Rest API**.<br />

Use of libraries like **Prisma ORM**, log management with **Morgan/Winston** (logging HTTP requests and rotating log files), unit test coverage with **Jest**, data validation schemas with **Zod**, JWT authentication, and other essential packages to start a new custom project.<br />

The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.

This repo is functionality complete.
<br/><br/>

## :rocket: Technologies

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![Expressjs](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/public/assets/images/getting-started)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://prettier.io/)
[![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)](https://nodemon.io/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
<br/><br/>

## :zap: Getting Started

To install the project, follow the steps below.

### Step 1 - Clone the Git repository

First, to clone the repository, you'll need [Git](https://git-scm.com/downloads) installed on your computer.
From your command line:

```bash
$ git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
```

### Step 2 - Install the project dependencies

To run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Make sure you install all the necessary dependencies to run the project from your command line:

```bash
$ cd typescript-express-boilerplate
$ npm install
```

### Step 3 - Configure your project variables

In the project folder you will find a `.env.example` file, duplicate it and rename it to `.env` only. The command below will copy the template environment variables file needed to initialize your project.<br />

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

Running locally in `development` environment:</br>

```bash
# development (watch mode)
$ npm run start:dev
```

When running locally, by default the API will be accessible at url http://localhost:3344 as illustrated below.

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/readme-api-running.png?raw=true" 
    width="450"
    alt="console-api-running"/>
  </kbd>
</div>
</br>

Running in a `production` environment (the code will be transpiled in the build folder and executed):</br>

```bash
# production mode
$ npm run start
```

<br/>

## :electric_plug: Create your database

You will need to configure an SQL database supported by the project's ORM in order to perform the data storage. By default the boilerplate uses a demo connection to the **PostgreSQL database**, but it can be changed to another database supported by the [Prisma ORM](https://www.prisma.io/stack).

If you want to install another database, remove the prisma folder, execute a new prisma initialization, follow the instructions and skip this section:

```bash
$ rm .\prisma
$ npx prisma init
```

If you want to continue with the [PostgreSQL](https://www.postgresql.org/download/) database but don't already have the software, download [pgAdmin](https://www.pgadmin.org/download/) now or use the Heroku Posgres cloud add-on.

### Option 1 - Create your database from the pgAdmin tool

#### Download and install pgAdmin

Download and install the [pgAdmin](https://www.pgadmin.org/download/) tool for [PostgreSQL](https://www.postgresql.org/download/) database management.

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/pgadmin/pgadmin-tool.jpeg?raw=true" 
    width="650"
    alt="pgadmin-tool"/>
  </kbd>
</div>
  
#### Create a PostgreSQL server instance

Run `pgAdmin`. Right-click on the item `Servers`, select `Create` -> `Server` and provide the connection to your PostgreSQL instance configured in the pgAdmin installation step. On the connection tab, make sure you have filled in the host as localhost as well as the access credentials. Click `Save` afterwards.

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/pgadmin/pgadmin-create-server.png?raw=true" 
    width="380"
    alt="pgadmin-create-server-instance"/>
  </kbd>
</div>
<br/>

#### Create a PostgreSQL database

Run `pgAdmin`. Right-click on the item `Servers`, select `Create` -> `Server` and provide the connection to your PostgreSQL instance configured in the pgAdmin installation step. On the connection tab, make sure you have filled in the host as localhost as well as the access credentials. Click `Save` afterwards.

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/pgadmin/pgadmin-create-database.png?raw=true" 
    width="380"
    alt="pgadmin-create-database"/>
  </kbd>
</div>
<br/>

### Option 2 - Create your database from Heroku with Heroku Postgres add-on

[Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql) is a managed SQL database service provided directly by the cloud plataform [Heroku], bypassing all those infrastructure headaches(https://signup.heroku.com/).

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/heroku/heroku-postgres-add-on.png?raw=true" 
    width="380"
    alt="heroku-postgres-add-on"/>
  </kbd>
</div>

Go to your Heroku account. If you have an account in Heroku, you can log in [here](https://id.heroku.com/login). If you need to setup a new one go [here](https://signup.heroku.com/login). They also offer a `free` tier.

Click to the Dashboard menu dropdown on your left. Select Databases.

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
