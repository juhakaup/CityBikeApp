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
If you have node installed, it should display the version number. If node is not installed, download it from https://nodejs.org and install, before continuing.

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

In order to use the app, you need to set up a database. If you already have PostgreSQL installed, or just want to use a local database, check the instructions for local setup.

[Local database setup](documents/localdb.md)

If you don't want to install additional software or just want to test the app, you can quickly setup a cloud based database.

[Cloud database setup](documents/railwaydb.md)

## Adding station and journey data

Download three datasets of journey data. The data is owned by City Bike Finland.

* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv>
* <https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv>

And the dataset for information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Dataset: <https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv>
* License and information: <https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902>

You can save them in the project folder for convenience.

Now use `node` and `uploadData.js`-file to push the data to  database.

Note that you need to insert the bicycle stations dataset first, because of database relations.

Use the following command to add the stations data:

```
$ node uploadData.js ../Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv
```
After a short while, it should have added the data to the database.

Next upload the journey data:
```
$ node uploadData.js ../2021-05.csv
```
This may take a while as there is quite a lot of data. 
Do the same thing with the two remaining files.

After this the app is ready to be used.


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