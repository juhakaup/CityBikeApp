## Cloud database setup 

Railway.app

From the main page click `Start a new project` button

From the list select `Provision PostgreSQL`

And railway will set up a new database, you don't even need to login.

To setup the connection click on the box that says Postgres.

And select the Variables tab.

From here you need to copy the values to the .env file located in the root of the server folder.

run `npm run migrate` to create database tables