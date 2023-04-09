<img src="https://github.com/vincent-queimado/boilerplate-api/blob/main/public/assets/images/logo.png?raw=true" alt="Logo" height="100px"/>

<div align="center">
  <h1> NodeJs boilerplate for creating an Express Rest API back-end application with Typescript</h1>
</div>

<div align="center">
  <strong> Typescript + Express + Sequelize + Jest</strong>
</div>

<br />

[![npm version](https://img.shields.io/npm/v/express-validator.svg)](https://www.npmjs.com/package/express-validator)

<div align="center">
  This project is a boilerplate for creating an Express Rest API back-end application with Typescript.
  Use of libraries like Sequelize ORM, log management with Morgan/Winston (console logs and rotating log files), unit test coverage with Jest, data validation schemes with Zod, JWT authentication, and other essential packages to start a new project.
  The architecture resembles the basic MVC model, despite having extra layers to facilitate support and customization of the project. We integrated the Prettier and Eslint tools into the project to help us automate type-checking during Typescript code development.
</div>

## Instructions

Para realizar a instalação do projeto, segue o passo a passo abaixo.

1. Fork, then download or clone the repo:

```bash
  git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
  cd typescript-express-boilerplate
```

2. Instalação das dependências do projeto:

```bash
  npm install
```

3. Configuração das variavéis de ambiente. O comando abaixo irá copiar o modelo de arquivo de variáveis de ambiente necessário a inicialização do projeto local.

```bash
cp .env.example .env
# abre o arquivo .env e altera as variáveis desejadas
```

4. Criação de banco de dados. Será necessário configurar um banco de dados SQL suportado pelo ORM Sequelize (Oracle, Postgres, MySQL, MariaDB, SQLite, SQL Server, e mais) para armazenamento de dados.
