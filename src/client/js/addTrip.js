//imports
const { dateChecker } = require('./validateDate.js');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
const { geonamesSearch } = require('./geonames.js');
const { getWeatherBit } = require('./weatherbit.js');
import 'babel-polyfill';
import { async } from 'regenerator-runtime';

// create new trip fragment
async function createNewTrip() {
    const userInput = await getTripDatesAndDestination();
    const weather = await getWeatherBit(
        await userInput.lng, 
        await userInput.lat, 
        await userInput.departureDate, 
        await userInput.returnDate,
        '327a6c289fd04805a16fea72bbed7a9a');
    userInput.maxTemp = await weather.max_temp;
    userInput.minTemp = await weather.min_temp;
    userInput.precip = await weather.precip;
    userInput.windSpd = await weather.wind_spd;
    console.log('IN crateTrip: '+ await userInput);

    postData('/newTrip', await userInput);

    
    

    // console.log('loading file');
    // const newTrip = document.createDocumentFragment();
    // const newDiv = document.createElement('div');
    // const contentDiv = document.getElementById('trips');
    // newDiv.setAttribute('id', tripName)
    // newDiv.innerHTML = await fetchHtmlAsText('/trip')
    // .then(contentDiv.appendChild(newDiv));
}

//get initial trip dates and destination
async function getTripDatesAndDestination () {
    const result = {};
    const departureDate = document.getElementById('departure-input').value;
    const returnDate = document.getElementById('return-input').value;
    const destination = document.getElementById('destination-input').value;
    const longAndLat = await geonamesSearch(destination);
    const existingTripCheck = await getData('/tripData');
    console.log(await existingTripCheck);
    if(!dateChecker(departureDate)) {
        alert('Invalid Departur Date');
    } else if(!dateChecker(returnDate)) {
        alert('Invalid Return Date!')
    } else if(longAndLat == null) {
        alert('Invalid Desination!')
    } else if((destination+departureDate) in existingTripCheck){
        alert('Trip Already Exists!')
    } else {
        result.departureDate = departureDate;
        result.returnDate = returnDate;
        result.destination = destination;
        result.lng = longAndLat.lng;
        result.lat = longAndLat.lat;
        console.log(result);
        return result;
    }
}


//POST request 
const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
      });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

//GET data request
const getData = async (url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        console.log('getData');
        console.log(allData);
        return allData;
    } catch(e) {
        console.log("getData error: ", e);
    };
}

export {
    createNewTrip,
    getTripDatesAndDestination
}