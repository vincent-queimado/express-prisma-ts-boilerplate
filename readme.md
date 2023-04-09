<div align="center">
  <img src="https://github.com/vincent-queimado/boilerplate-api/blob/main/public/assets/images/logo.png?raw=true" alt="Logo" height="100px"/>
</div>

<div align="center">
  <h1>Express RESTful API Boilerplate Using TypeScript<br/>(Express + Typescript + Sequelize + Jest)</h1>
</div>

<p align="center">
  <span>A starter project written in TypeScript for quickly building Express RESTful APIs using ORM, loggers, schema validator, authentication, unit test coverage, and much more..</span></br>
  <sub>Made with ❤️ by <a href="https://github.com/vincent-queimado">Vincent Jean</a></sub>
</p>

![divider](./public/assets/images/readme-divider.png)

## Introduction

This project is a starter project written in TypeScript for quickly building an Express Rest API.<br />
Use of libraries like Sequelize ORM, log management with Morgan/Winston (console logs and rotating log files), unit test coverage with Jest, data validation schemes with Zod, JWT authentication, and other essential packages to start a new project.<br />
The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.

## Instructions

To install the project, follow the steps below.

### Step 1 - Fork, then download or clone the repo:

```bash
  git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
  cd typescript-express-boilerplate
```

### Step 2 - Install the project dependencies

```bash
  npm install
```

### Step 3 - Configuration of environment variables

<br />
The command below will copy the template environment variables file needed to initialize the local project.

```bash
cp .env.example .env
# abre o arquivo .env e altera as variáveis desejadas
```

### Step 4 - Database creation

<br />
Será necessário configurar um banco de dados SQL suportado pelo ORM Sequelize (Oracle, Postgres, MySQL, MariaDB, SQLite, SQL Server, e mais) para armazenamento de dados.
