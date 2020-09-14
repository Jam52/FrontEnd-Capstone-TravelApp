//data endpoint
const data = {};

require('dotenv').config();

// initialising express
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('./dist'));

// setting up middlewear and dependencies
const axios = require('axios');
const bParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bParser.urlencoded({ extended: false }));
app.use(bParser.json());

//setting headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// get Index entry point
app.get('/', function (req, res) {
  res.send(path.resolve('dist/index.html'));
});

app.get('/trip', function (req, res) {
  console.log('++GETTING TRIP++');
  res.sendFile(path.resolve('dist/trip.html'));
});

app.get('/tripData', function (req, res) {
  res.send(data);
});

//api geoname call
app.get('/geonames/:cityname', function (req, res) {
  const city = req.params.cityname;
  axios
    .get(
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.GEONAME}`,
    )
    .then((response) => {
      console.log('__getting geoname data__');
      console.log(response.data.geonames[0]);
      res.send(response.data.geonames[0]);
    })
    .catch((error) => {
      console.log(error);
      res.send({});
    });
});

//api weaterbit call
app.get('/weatherbit/:lng/:lat/:startDate/:endDate', (req, res) => {
  console.log('__getting weatherbit data__');
  const urlProxy = 'https://cors-anywhere.herokuapp.com/';
  const key = process.env.WEATHERBIT;
  const lng = Math.round(req.params.lng * 10) / 10;
  const lat = Math.round(req.params.lat * 10) / 10;
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;

  const getWeather = async () => {
    try {
      return await axios.get(
        `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lng}&key=${key}`,
      );
    } catch (error) {
      console.log('ERROR CAUGHT');
      console.log(error);
      res.send(error);
    }
  };

  const returnWeather = async () => {
    const weather = await getWeather();
    console.log(await weather.data.data[0]);
    res.send(await weather.data.data[0]);
  };

  returnWeather();
});

//api pixabay call
app.get('/pixabay/:destination', (req, res) => {
  const key = process.env.PIXABAY;
  const destination = req.params.destination;
  axios
    .get(
      `https://pixabay.com/api/?key=${key}&q=${destination}&lang=en&category=travel&order=popular`,
    )
    .then((response) => {
      console.log('__getting pixabay data__');
      console.log(response.data.hits[0]);
      res.send(response.data.hits[0]);
    });
});

// export app for supertest and start.js
module.exports = app;

//POST trip data to server
app.post('/newtrip', async (req, res) => {
  try {
    const newTripData = req.body;
    const newTripName = newTripData.destination + newTripData.departureDate;
    const newTrip = {
      departureDate: newTripData.departureDate,
      returnDate: newTripData.returnDate,
      destination: newTripData.destination,
      temp: newTripData.temp,
      clouds: newTripData.clouds,
      windSpd: newTripData.windSpd,
      precip: newTripData.precip,
      packingList: [],
    };
    if (!(newTripName in data)) {
      data[newTripName] = newTrip;
    }
  } catch (error) {
    console.log(error);
  }
});

//post request to add new packing item
app.post('/newPackingItem', (req, res) => {
  const request = req.body;
  const item = request.item;
  const trip = request.trip;
  data[trip].packingList.push(item);
});

//delete request to remove packing item
app.delete('/removePackingItem/:tripName/:item', (req, res) => {
  const itemToRemove = req.params.item;
  console.log(itemToRemove);
  const trip = req.params.tripName;
  const array = data[trip].packingList;
  array.forEach(function (element, index) {
    if (element == itemToRemove) {
      data[trip].packingList.splice(index, 1);
    }
  });

  console.log(data[trip]);
});

//post request to add additional trip data
app.post('/addAdditionalData', (req, res) => {
  console.log('__attempting to post new trip data__');
  console.log(data);
  try {
    const request = req.body;
    const name = request.name;
    console.log(name);
    const newData = request.data;
    console.log(newData);
    const trip = request.tripName;
    console.log(trip);
    data[trip][name] = newData;
    console.log(data[trip]);
  } catch (error) {
    console.log('__posting additional data__');
    console.log(error);
    res.status(500);
  }
});

//delete request to remove intire trip
app.delete('/deleteTrip/:tripName', (req, res) => {
  const tripName = req.params.tripName;
  delete data[tripName];
  console.log(data);
});
