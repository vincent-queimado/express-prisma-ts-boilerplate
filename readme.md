<div align="center">
  <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/readme-header.png?raw=true" alt="readme-header"/>
</div>

<div align="center">
  <h1>Express RESTful API boilerplate using TypeScript<br/>NodeJs + Express + Typescript + Prisma</h1>
</div>

<p align="center">
  <span>A starter NodeJs project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more.</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

<div align="center">

[![Passing Test](https://github.com/vincent-queimado/express-prisma-ts-boilerplate/workflows/build/badge.svg)](https://github.com/vincent-queimado//vincent-queimado/express-prisma-ts-boilerplate)
[![codecov](https://codecov.io/gh/vincent-queimado/express-prisma-ts-boilerplate/branch/master/graph/badge.svg?token=GN0J6Y47VM)](https://codecov.io/gh/vincent-queimado/express-prisma-ts-boilerplate)

[![NodeJs](https://img.shields.io/badge/dynamic/json?label=node&query=%24.engines%5B%22node%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Fvincent-queimado%2Fexpress-prisma-ts-boilerplate%2Fmaster%2Fpackage.json)](https://nodejs.org/ 'Go to NodeJs')
[![NPM](https://img.shields.io/badge/dynamic/json?label=npm&query=%24.engines%5B%22npm%22%5D&url=https%3A%2F%2Fraw.githubusercontent.com%2Fvincent-queimado%2Fexpress-prisma-ts-boilerplate%2Fmaster%2Fpackage.json)](https://www.npmjs.com/ 'Go to NPM')
[![Package - Typescript](https://img.shields.io/github/package-json/dependency-version/vincent-queimado/express-prisma-ts-boilerplate/dev/typescript?logo=typescript&logoColor=white)](https://www.npmjs.com/package/typescript 'Go to TypeScript on NPM')
[![Package - Prisma](https://img.shields.io/github/package-json/dependency-version/vincent-queimado/express-prisma-ts-boilerplate/dev/prisma?logo=prisma&logoColor=white)](https://www.npmjs.com/package/prisma 'Go to Prisma on NPM')
[![Package - Jest](https://img.shields.io/github/package-json/dependency-version/vincent-queimado/express-prisma-ts-boilerplate/dev/jest?logo=jest)](https://www.npmjs.com/package/jest 'Go to Jest on NPM')

</div>

![divider](https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/readme-divider.png)

## :blue_heart: About the boilerplate

This project is a simple and complete boilerplate written in **TypeScript** to quickly create an **Express Rest API**.<br />

Use of libraries like **Prisma ORM**, log management with **Morgan** and **Winston** (tracking of HTTP request logs in real time and storage of rotating log files with web visualization via EJS engine), unit test coverage with **Jest**, data validation schemas with **Zod**, JWT middleware authentication, **Swagger** documentation, and other essential packages to start a new custom project.<br />

The boilerplate is based on the MVC architecture with extra layers to facilitate support and customization of the project. We integrated the **ESLint** and **Prettier** tools into the project to help us automate type-checking during Typescript code development.

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
[![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io/)
<br/><br/>

## :zap: Getting Started - Project setup

To install the project, follow the steps below.

### Step 1 - Clone the Git repository

First, to clone the repository, you'll need [Git](https://git-scm.com/downloads) installed on your computer.
From your command line:

```bash
$ git clone https://github.com/vincent-queimado/express-prisma-ts-boilerplate.git
```

### Step 2 - Install the project dependencies

To run this application, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Make sure you install all the necessary dependencies to run the project from your command line:

```bash
$ cd express-prisma-ts-boilerplate
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
    width="600"
    alt="console-api-running"/>
  </kbd>
</div>
</br>

Running in a `production` environment (the code will be transpiled in the build folder and executed):</br>

```bash
# production mode
$ npm run start:prod
```

<br/>

## :electric_plug: Create your database from ORM

You will need to configure an SQL database supported by the Prisma ORM in order to perform the data storage. By default the boilerplate uses a demo connection to the **PostgreSQL database**, but it can be changed to another database supported by the [Prisma ORM](https://www.prisma.io/stack).

If you want to install another database, remove the Prisma folder, execute a new prisma initialization, follow the instructions and skip this section:

```bash
$ rm .\prisma
$ npx prisma init
```

If you want to continue with the [PostgreSQL](https://www.postgresql.org/download/) database but don't already have the software, download [pgAdmin](https://www.pgadmin.org/download/) now or use a Hosting Cloud Service.

## Initialize your database

You will need to configure a SQL database supported by Prisma ORM for data storage.

Before running the project, it will be necessary to perform a migration through Prisma. In this way, the first tables of the project will be created. When executing the reset command, the ORM seed will be called, thus populating some tables:

Migration run command:

```bash
$ npm run migrate
```

Obs.: Initially, the project assumes that we will use the PostgreSQL database by default, but feel free to change the connection data to the database of your choice.

## Available .env Settings
|Name  |Description  |
|--|--|
|APP_URL_HOST         |[String] It is the host the API will use. By default it is **localhost**.  |
|APP_URL_PORT         |[String] It is the port the API will use. By default it is **3344**.       |
|SSL_ALLOW            |[String] Enable or disable SSL in the API. By default it is **false**.     |
|SSL_PRIVATE_KEY      |[String] Private Key for SSL. By default it is **/etc/letsencrypt/live/mydomain/privkey.pem**.   |
|SSL_CERTIFICATE      |[String] Certificate path for SSL. By default it is '**/etc/letsencrypt/live/mydomain/cert.pem**.|
|API_PREFIX           |[String] Api route prefix. By default it is **api**.   |
|API_VERSION          |[String] Api route version. By default it is **v1**.   |
|API_JSON_LIMIT       |[String] Limits request JSON body size. By default it is '**5mb**.|
|API_EXT_URLENCODED   |[String] The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. By default it is '**false**.|
|CORS_ALLOW_ORIGIN    |[String] Enable or disable CORS in the API. By default it is \*.|


## More scripts

The boilerplate ships with several convenience commands (runnable via `npm`):

-   `npm run lint:check`: run code linting to check for syntax errors
-   `npm run lint:fix`: automatically fix lint problems
-   `npm run prettier:check`: checks that the code style is correctly formatted
-   `npm run prettier:format`: automatically fix prettier problems
-   `npm run test`: run functional tests with coverage
-   `npm run test:watch`: run functional tests in watch mode
-   `npm run prisma:format`: check .prisma files format
-   `npm run prisma:migrate`: reads the data sources and data model definition to create a new migration
-   `npm run prisma:generate`: reads all above mentioned information to generate the data source
-   `npm run prisma:generate:watch`: watch the Prisma schema and rerun after a change
-   `npm run prisma:reset`: reset your database and apply all migrations, all data will be lost
-   `npm run prisma:seed`: seed the database
-   `npm run commit`: help you follow conventional commits flow

## Scope of structure

Boilerplate structure summary:

```
build\                    # Transpiled TypeScript code to Javasccript
coverage\                 # Unit test reports
docs\                     # Documentation / Postman collection / Readme assets
logs\                     # Log files (generate with Winston packages)
node_modules\             # NodeJS packages
prisma\                   # Prisma schema and client connection / Migrations and seed
  |--migrations\          # Database migration
  |--seed\                # Database seed
public\                   # Public ressources
src\                      # Sources
  |--config\              # Environment variables and configuration related things
      |--app\             # App configuration file
      |--database\        # Database configuration file
      |--email\           # Email configuration file
  |--controllers\         # Controllers
      |--plataform        # Plataform business logic
  |--database\            # Database connection
  |--functions\           # Functions
  |--middlewares\         # Middlewares (JWT auth, data validation schema, Morgan, and other middlewares)
  |--models\              # Models
  |--presenters\          # Presenters (Extra layer over MVC)
  |--routes\              # Custom Routes
  |--server\              # Http server using the Express framework
  |--services\            # Services
  |--utils\               # Utility handler, logger, mailer, etc..
  |--views\               # Views (basic views renderized by EJS engine)
  |--app.js               # Entry point
tests\                    # Unit test coverage with Jest
```

## Postgresql database creation example

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

Reports the URL based on the credentials and database information in the `DATABASE_URL` variable located in the `.env` file. Example:

```bash
#.env
...
# DATABASE
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
...
```

### Option 2 - Create your database from Hosting Cloud Service

[ElephantSQL](https://api.elephantsql.com/) is a free tier hosting cloud service for the PostgreSQL database, bypassing all those infrastructure headaches (https://api.elephantsql.com/).

Create a free instance (Tiny Turtle plan) and copy the URL in the `DATABASE_URL` variable of the `.env` file. The free version is limited to 20MB.

<div align="left">
  <kbd>
    <img src="https://github.com/vincent-queimado/typescript-express-boilerplate/blob/master/public/assets/images/readme/elephantsql/elephantsql-free-instance.png?raw=true" 
    width="600"
    alt="elephantsql-create-instance"/>
  </kbd>
</div>
<br/>
