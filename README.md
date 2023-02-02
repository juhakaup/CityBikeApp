# City Bike App

Solita dev academy pre-assignment.

## About
The aim of this project was to develop an app that displays stations and individual rides on Helsinki city bikes.

## Installation

### Node.js
You must have node.js installed on your system before you can install the app.

To check that node is installed, type `node --version` on the command prompt:

```
$ node --version
v16.16.0
```
If you have node installed, it should display the version number. If node is not installed, download it from https://nodejs.org/en/ and install, before continuing.

### Fetching the repocitory
You can find the repository from github:
https://github.com/juhakaup/CityBikeApp

To clone the repository from github,  use the following command:

```
$ git clone https://github.com/juhakaup/CityBikeApp.git
```

### Installing backend

Navigate to the server folder and install it using npm:

```
$ cd .\CityBikeApp\server
$ npm install
```

### Installing frontend

Navigate to the client folder and install it using npm:

```
$ cd ..\client
$ npm install
```

## Database
The application uses PostgreSQL database to store data.

In order to use the app, you to set up a database.

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

### Adding station and journey data

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

Download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

And the dataset for information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
* License and information: <https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902>

Save them in the project or server folder for convenience.

Now use `node` and `uploadData.js`-file to push data to the database.

You need to insert the bicycle station dataset first, because of database relations.

```
$ node uploadData.js ../Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv
```
After a short while, it should have added the data to the database.

Next upload the journey data:
```
$ node uploadData.js ../2021-05.csv
```
Do the same thing with the two remaining files.

After this the app is ready to be used.

## Running the app

Start the backend by navigating to the server folder and running the following command:
```
$ npm start
```
Next open a new command line instance and move to the clien folder. Start the front-end with the command:
```
$ npm start
```
The app should automatically open a new window to your browser,
if not, you can find it in the following address http://localhost:3000/.

## Technology

The application is written in javascript and uses the following technologies.

### Backend
* Node.js
* Express
* PostgreSQL
* Sequelize

### Frontend
* React
* Material-ui
* Leaflet

Testing is done with Jest.