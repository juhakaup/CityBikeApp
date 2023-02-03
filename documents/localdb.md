## Local database setup
In order to use a local database, you must have PostreSQL installed on your system.

If not, you can download and install it from here: https://www.postgresql.org/download/.

First, we need to create a database. You can use pgAdmin and create new database from there, or use psql from the command line.

To create a database with psql, you need to login first:
```
$ psql -U <username>
```
For example:
```
$ psql -U postgres
```
After entering your password, you can use the following command to create the database:
```
CREATE DATABASE citybike_app;
```
Next we need to add an .env -file to the root of server directory and add the following content to it

```
PGUSER='username'
PGHOST='localhost'
PGPASSWORD='password'
PGDATABASE='citybike_app'
PGPORT=5432
```

Replace username and password with your postgres username and password.


To test the connection, start the server:
```
$ npm start
```
You should see a message about succesful connection and that the server is running.

To add data, we first need to create some tables to the database.

Do this with the following command:
```
$ npm run migrate
```
To check that the tables were created you can run the following comman in psql:
```
\dt
```
And it should output a list of tables, something like this:
```
             List of relations
 Schema |     Name      | Type  |  Owner
--------+---------------+-------+----------
 public | SequelizeMeta | table | postgres
 public | journeys      | table | postgres
 public | stations      | table | postgres
 ```