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

## Prerequisites

-   [Node.js](https://nodejs.org/): ^18.0.0
-   [NPM](https://npmjs.org/) or any other Node.js package manager

## How to run the project?

To install the project, follow the steps below.

#### Step 1 - Download or clone the repo

First, open your terminal and type the necessary commands to download the project and access it.

```bash
$ git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
$ cd typescript-express-boilerplate
```

#### Step 2 - Install the project dependencies

Second, make sure you install all the necessary dependencies to run the project:

```bash
$ npm install
```

#### Step 3 - Configure your project variables

The command below will copy the template environment variables file needed to initialize your project.<br />
After renaming the file, open it and change the desired variables:

```bash
$ cp .env.example .env
```

Important, remember to change the variable values ​​according to your project:

```bash
#.env
APP_URL_HOST='localhost'
APP_URL_PORT='3344'
APP_URL_SSL='false'
...
```

#### Step 4 - Configure your database

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
