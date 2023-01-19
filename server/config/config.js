const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = require('../util/config');
module.exports = 
{
  "development": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": "postgres",
    "logging": true
  },
  "test": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": "postgres"
  },
  "production": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "dialect": "postgres"
  }
};