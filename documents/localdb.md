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
After loggin in you can use the following command to create the database:
```
CREATE DATABASE citybike_app;
```
Next we need to create a file named .env in the root of server and add the following content to it

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
and it should prompt for succesful connection
```
Connection has been established successfully.
Server running on port 3001
```
You can close the server by pressing `ctrl + C`


## Creating database tables
In order to use the database, we need to create the tables first. 

This can be done with the `npm run migrate` command:

```
$ npm run migrate

Loaded configuration file "config\config.js".
Using environment "development".
== 20230118072806-init: migrating =======
== 20230118072806-init: migrated (0.922s)

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
 Next, [add data to the database](../README.md#adding-data-to-the-database).