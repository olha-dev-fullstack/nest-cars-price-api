# Cars price API

This is a simple REST used cars pricing API where users can authenticate, create reports about cars to sell and get price prediction. The project is built using NestJS, SQLite and TypeORM. Authorization and authentication works on sessions and cookies.

## Features

- **Reports Management**: Users can create and approve reports (approve only for users with admin permission).
- **Authorization**: Is implemented using cookie session. After registration user receives token which is attached to cookie header for all following reports until user signs out
- **User account management**: It is possible to create, update, delete and view user profile

## Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **SQLite**: Simple and lightweight solution for local development to work with database.
- **TypeORM**: An ORM used for database interaction and migrations.
- **Jest**: Testing framework used for writing unit and integration tests.

## How to run the project

### 1. Clone the Repository

```bash
git clone https://github.com/olha-dev-fullstack/nest-cars-price-api.git
cd nest-cars-price-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` files:

- `dev.env` for developmet mode with next settings:

```bash
DB_NAME=db.sqlite
COOKIE_KEY=<your value>
```

- `test.env` for running `e2e` tests:

```bash
DB_NAME=db.sqlite
COOKIE_KEY=<your value>
```

- `production.env` (for production Postgres database is used):

```bash
DATABASE_URL=<url to your database>
COOKIE_KEY=<your value>
```

### 3. Database Setup

Run migrations to create local database:

```bash
npm run migration:run
```

### 5. Start the Server

Run the NestJS server:

- watch mode

```bash
npm run start:dev
```

- dev mode

```bash
npm run start
```

- production mode

```bash
npm run start:prod
```

The API will be available at `http://localhost:3000`.

## API Endpoints

#### Authentication and Users

- **POST** `/auth/signup`: User signup (created as admin by default)

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

- **GET** `/auth/:id`: Get authorized user profile (requires authentication)
- **DELETE** `/auth/:id` Delete user
- **PATCH** `/auth/:id` Update user (requires authentication)

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

- **POST** `/auth/signin`: User signin

```json
{
  "email": "test@test.com",
  "password": "password"
}
```

- **GET** `/auth/me`: Get current user (requires auth)

#### Reports

- **POST** `/report`: Create a new report (requires authentication)

```json
{
  "make": "ford",
  "model": "mustang",
  "year": 1982,
  "mileage": 50000,
  "lng": 45,
  "lat": 45,
  "price": 20000
}
```

- **GET** `/report/:id`: Approve or disapprove report (admin only)

```json
{
  "approved": true
}
```

- **GET** `/report/?make=ford&model=mustang&lng=45&lat=45&mileage=20000&year=1981`: Get estimated car price according to params

## Running Tests

To run unit tests, use:

```bash
npm run test
```

To run End-to-End tests, use:

```bash
npm run test:e2e
```
