//data endpoint
const data = {};

// initialising express 
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('./dist'))

// setting up middlewear and dependencies
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
    console.log('__getting trip data__');
    res.send(data);
})

// designate PORT
app.listen(8080, function () {
    console.log('listening on port 8080');
})

//weatherbit fetch

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

app.post('/newPackingItem', (req, res) => {
    const request = req.body;
    const item = request.item;
    const trip = request.trip;
    data[trip].packingList.push(item);
    console.log(data[trip]);
})

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