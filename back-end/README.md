# Tawal - LMO API

The project is based on [LoopBack](http://loopback.io).

As database we're using PostgreSQL and for the OS, we're using Ubuntu.

## Configuring Environments

### Development Environment

While in development, you should add a `.env` file to the root of the back-end folder with the following content:

```ini
NODE_ENV=development
DEBUG=app*,script*,loopback:connector:postgresql
```

### Sandbox Environment

While in sandbox, you should add a `.env` file to the root of the back-end folder with the following content:

```ini
NODE_ENV=sandbox
SSL_CERTIFICATE=/etc/letsencrypt/live/example.com/fullchain.pem
SSL_CERTIFICATE_KEY=/etc/letsencrypt/live/example.com/privkey.pem
```

### Production Environment

While in production, you should add a `.env` file to the root of the back-end folder with the following content:

```ini
NODE_ENV=production
SSL_CERTIFICATE=/etc/letsencrypt/live/example.com/fullchain.pem
SSL_CERTIFICATE_KEY=/etc/letsencrypt/live/example.com/privkey.pem
```

### Database configuration

For configuring the database credentials, you should create a copy of the `server/datasources.json` and name it `datasources.local.json`.

This file is git-ignored and you can enter the proper credential information safely.

Please note that in absense of a `*.local.json` file, the original will be used, so there is no need to create a `datasources.local.json` file if you are going to run the Development Environment which uses the default credentials.

## Useful NPM Scripts

- `npm run recreate-db` will drop and create all tables again, based on the latest model definitions.
- `npm run insert-dummy-data` will add dummy data to database. You can use it as many times you want.

## Notes

Loopback automatically creates tables and columns names in lowercase. Also, note that PostgreSQL is case insensitive if referring to a column name without using double quotes on query (which is what Loopback does).
