# university-portal

This is the backend for our CSE347 project, We had to use class diagram thats why we used unnessesary Classes and objects 

## Project setup

### Install `yarn` if not installed

#### check if `yarn` installed or not.

```sh
yarn --version
```

if its not installed. then install `node js`.

#### open `terminal`/`command prompt` and run following

```sh
npm install --global yarn
```

### Install `postgres` database

We need postgres database server

- `username`
- `password`
- `port`
- `database name`

### Open this project in visual studio

#### Clone this repo

```sh
git clone https://github.com/AbrarShakhi/university-portal-backend.git
```

#### open `university-portal-backend` folder in visual studio

### Configure project

#### Project structure

```sh
university-portal-backend
├── db_schema
├── .env <- *YOU NEED TO THIS FILE*
├── .git
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
├── .prettierignore
├── .prettierrc
├── README.md
├── server.js
├── src
└── yarn.lock
```

You need to create a `.env` file.
put this variables in `.env` file

```env
SERVER_PORT=8000

JWT_SECRET="SSSR"

DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=5432

CLIENT_URL="http://localhost:3000"

APP_EMAIL=
EMAIL_PASS=

# NODE_ENV="production"
NODE_ENV="development"
```

You need to fill these variables

- You can set anything to `JWT_SECRET`. But it is for password encryption. passwords will not match if you change it later.
- `DB_USER`, `DB_HOST`, `DB_NAME`
  , `DB_PASSWORD`, `DB_PORT` they are for postgres database connection
- also you need `APP_EMAIL` and `EMAIL_PASS` for sending emails with nodemailer.

If they are filled up correctly. Now we are ready to start the server.

#### import database
In db_schema folder, there is `uni_db.ddl.sql` and `uni_db.dml.sql` you need to import that to the postgress database.

#### Install node dependencies

```sh
yarn
```

#### Start the server

```sh
yarn start
```

Server should start in port you spacified.

> **NOTE**: You do not need to do all of these all the time. only do `yarn start` next time.
