# City Bike App

## About
This is the Solita dev academy pre-assignment for spring 2023.

The aim of this project was to develop an app that displays stations and individual rides on Helsinki city bikes.

The deployed version of the app can be found here: https://citybikeapp.fly.dev/

## Contents

* [Installing](#installing)
* [Setting up the database](#database)
  * [Local database setup](documents/localdb.md)
  * [Cloud database setup](documents/railwaydb.md)
* [Adding data to the database](#adding-data-to-the-database)
* [Running the app](#running-the-app)
* [Tests](#tests)
* [Technology used in the app](#technology-used-in-the-app)

## Installing

To install the app, you must have Node.JS installed on your system.

To check if node is installed, run `node -v`. 

If it's not installed, download it from https://nodejs.org and install before proceeding.

```
$ node --version
v16.16.0
```

### Fetching the repocitory

To clone the repository from github,with the following command:

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

In order to use the app, you need to set up a database. If you have PostgreSQL installed or prefer to use a local database, follow the local setup instructions.

[Local database setup](documents/localdb.md)

If you don't want to install extra software or want to test the app quickly, you can easily set up a cloud database, follow the cloud database setup instructions.

[Cloud database setup](documents/railwaydb.md)

## Adding data to the database

Download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

And the dataset for information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
* License and information: <https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902>

You can save them in the project folder for convenience.

Use `node` and `uploadData.js`-file in the server folder to push the data to database.


Note that you need to insert the bicycle stations dataset first, because of database relations.

Use the following command to add the stations data:

```
$ node uploadData.js ../Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv
```
The data should be added to the database shortly.


Next upload the journey data:
```
$ node uploadData.js ../2021-05.csv
```
This may take some time due to the large amount of data.

Do the same for the two remaining files.

_Note that if you are using the cloud based database this transfer method is not quite roboust enough to handle transfer errors and you may experience some lost data. It should work fine with the local database_


After the data is transderred, the app is ready to be used.


## Running the app

Start the backend by navigating to the server folder and running the following command:
```
$ npm start
```
Next navigate to the client folder. Start the front-end with a command:
```
$ npm start
```
The app should automatically open a new window to your browser,
if not, you can find it in the following address http://localhost:3000/.

## Tests

The application uses Jest as a testing framework.

Backend tests check that the endpoints return appropriate messages depending on given request and parameters. There are also tests that check that the validation of cvs data works correctly.

To run backend test, navigate to server folder and run:
```
$ npm test
```
Frontend tests check that a components gets rendered and displays correct output, even when the data has no been fetched yet.

To run fronted test, navigate to client folder and run:
```
$ npm test
```

## Technology used in the app

The application is written in javascript and uses the following technologies.

### Backend
* Node.js
* Express
* PostgreSQL
* Sequelize

I used Node.js and Express to build the backend server. These are the technologies I was the most familiar with and the idea was to build on something familiar and then do something new with the database side. For the database I chose to use PostgreSQL, basically to get some more experience with it. I used Sequelize to interact with the database. I had not used Sequelize before, but the idea of ORM was familiar from working with Django.

### Frontend
* React
* Material-ui
* Leaflet

For the frontend I went with React. I had used it before and knew that I could get things running quite quickly. To complicate things a bit and to learn something new, I used Material UI as a component library. For the map I used Leaflet, again, something familiar and had no trouble getting up and running.

Testing was done with Jest. Made some integration tests for the backend and component test for the frontend. The coverage is not great, but tests did help me to catch some bugs in the backend. 