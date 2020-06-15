//data endpoint
const data = {};

// initialising express 
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('./dist'))

// setting up middlewear and dependencies
const axios = require('axios');
const bParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bParser.urlencoded({extended: false}));
app.use(bParser.json());


// get Index entry point
app.get('/', function (req,res) {
    res.send(path.resolve('dist/index.html'));
})

app.get('/trip', function (req, res) {
    console.log('++GETTING TRIP++');;
    res.sendFile(path.resolve('dist/trip.html'));
})

app.get('/tripData', function (req, res) {
    
    res.send(data);
})

//api geoname call
app.get('/geonames/:cityname', function (req,res) {
    const city = req.params.cityname;
    axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=Jam52`)
    .then(response => {
        console.log('__getting geoname data__');
        console.log(response.data.geonames[0]);
        res.send(response.data.geonames[0]);
    })
    .catch(error => {
        console.log(error);
        res.send({});
    })
})

//api weaterbit call
app.get('/weatherbit/:lng/:lat/:startDate/:endDate', (req, res) => {
    const key = '327a6c289fd04805a16fea72bbed7a9a';
    const lng = req.params.lng;
    const lat = req.params.lat;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    axios.get(`https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lng}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=${key}`)
    .then(response => {
        console.log('__getting weatherbit data__');
        console.log(response.data.data[0]);
        res.send(response.data.data[0]);
    });
})

// export app for supertest and start.js
module.exports = app;


//POST trip data to server
app.post('/newtrip', async (req, res) => {
    try{
        const newTripData = req.body;
        const newTripName = newTripData.destination + newTripData.departureDate;
        const newTrip = {
            "departureDate": newTripData.departureDate,
            "returnDate": newTripData.returnDate,
            "destination": newTripData.destination,
            "maxTemp": newTripData.maxTemp,
            "minTemp": newTripData.minTemp,
            "windSpd": newTripData.windSpd,
            "precip": newTripData.precip,
            "imgUrl": newTripData.imgUrl,
            "packingList": []
        };
        if(!(newTripName in data)) {
            data[newTripName] = newTrip;
        }
    } catch(error) {
        console.log(error);
    }
})

//post request to add new packing item
app.post('/newPackingItem', (req, res) => {
    const request = req.body;
    const item = request.item;
    const trip = request.trip;
    data[trip].packingList.push(item);

})


//delete request to remove packing item
app.delete('/removePackingItem/:tripName/:item', (req, res) => {
    const itemToRemove = req.params.item;
    console.log(itemToRemove);
    const trip = req.params.tripName;
    const array = data[trip].packingList;
    array.forEach(function(element, index) {
        if(element == itemToRemove){
            data[trip].packingList.splice(index, 1);
        }
    });
    
    console.log(data[trip]);
})

//post request to add additional trip data
app.post('/addAdditionalData', (req, res) => {
    try{
        const request = req.body;
        const name = request.name;
        console.log(name);
        const newData = request.data;
        console.log(newData);
        const trip = request.tripName;
        console.log(trip);
        data[trip][name] = newData;
        console.log(data[trip]);
    } catch(error) {
        console.log('__posting additional data__');
        console.log(error);
        res.status(500);
    }

})

//delete request to remove intire trip
app.delete('/deleteTrip/:tripName', (req, res) => {
    const tripName = req.params.tripName;
    delete data[tripName];
    console.log(data);
})