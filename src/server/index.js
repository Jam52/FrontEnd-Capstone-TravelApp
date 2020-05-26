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

// designate PORT
app.listen(8080, function () {
    console.log('listening on port 8080');
})