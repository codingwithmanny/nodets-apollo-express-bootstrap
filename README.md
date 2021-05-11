# NodeTS Apollo Express Bootstrap

## Local Setup

```bash
docker-compose up -d;
cp .env.example .env;
yarn knex migrate:latest;
yarn knex seed:run;
yarn dev;
```

**NOTE** There is a `/public` static folder which can be used to see how it connects to graphql with
axios at http://localhost:{PORT}

## Database

For local development run:

```bash
docker-compose up -d;
```

To do a clean up run:

```bash
docker-compose down -v --remove-orphans
```

### Migrations

**Create New Migration:**

```bash
yarn knex migrate:make {create|alter_table_name};
```

**Run Migrations:**

```bash
yarn knex migrate:latest;
```

### Seeds

**Create New Seed:**

```bash
yarn knex seed:make {00-seed-name};
```

**Run Seed:**

```bash
yarn knex seed:run;
```
