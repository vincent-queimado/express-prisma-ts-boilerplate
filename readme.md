<img src="https://github.com/vincent-queimado/boilerplate-api/blob/main/public/assets/images/logo.png?raw=true" alt="Logo" height="100px"/>

# Boilerplate Typescrypt + Express + Sequelize + Jest

Aplicação back-end REST API com NodeJS, em Typescript, utilizando o framework Express além de pacotes essenciais na construção de um projeto base tal como o suporte a bancos de dados via ORM Sequelize, a cobertura de testes unitários vi JEST, ou a gestão de arquivos de logs rotativos a partir de Winston, entre outros recursos.

## Instalação

Para realizar a instalação do projeto, segue o passo a passo abaixo.

Clone do repositório:

```bash
  git clone https://github.com/vincent-queimado/typescript-express-boilerplate.git
  cd typescript-express-boilerplate
```

Instalação de dependências/pacotes necessário ao projeto:

```bash
  npm install
```

Configuração de variavéis de ambiente. O comando abaixo irá copiar o arquivo de exemplo para o arquivo de variaveis de ambiente necessário a inicialização do projeto:

```bash
cp .env.example .env
# abre o arquivo .env e altera as variaveis caso necessário
```

Antes de executar o projeto, será necessário configurar um banco de dados SQL suportado pelo Sequelize (Oracle, Postgres, MySQL, MariaDB, SQLite, SQL Server, e mais).

Obs.: É possível criar uma aplicação na plataforma Heroku (criação de conta grátis https://signup.heroku.com/), e em seguida adicionar o recurso (add-on) de banco de dados tal como "Heroku Posgres".
