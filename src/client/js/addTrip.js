//imports
const { dateChecker } = require('./validateDate.js');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
const { fetchGeonames } = require('./geonames.js');
const { getWeatherBit } = require('./weatherbit.js');
const { fetchPixabay } = require('./fetchPixabay');
import { async } from 'regenerator-runtime';

// create new trip fragment
async function createNewTrip() {
    //get data from DOM
    const data = await getTripDatesAndDestination();
    //add lng and lat using initial userInput data
    const weather = await getWeatherBit(await data, '327a6c289fd04805a16fea72bbed7a9a');
    data.maxTemp = await weather.max_temp;
    data.minTemp = await weather.min_temp;
    data.precip = await weather.precip;
    data.windSpd = await weather.wind_spd;
    console.log(await data.destination);
    //add img url to userInput data
    const imgUrl = await fetchPixabay(await data.destination);
    data.imgUrl = await imgUrl;

    //postData to the server
    postData('/newTrip', await data);


}

//get initial trip dates and destination
async function getTripDatesAndDestination () {
    const result = {};
    //get data from DOM
    const departureDate = document.getElementById('departure-input').value;
    const returnDate = document.getElementById('return-input').value;
    const destination = document.getElementById('destination-input').value;
    //get lng and lat using destination from userInput
    const longAndLat = await geonamesSearch(destination);
    //get existing trip data to check if trip already exists
    const existingTripCheck = await getData('/tripData');
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

//geonames fetch function returning only required infomation
async function geonamesSearch(location){
    const data = {};
    try {
        const geonames = await fetchGeonames(location);
        data.lng = await geonames.geonames[0].lng;
        data.lat = await geonames.geonames[0].lat;
        console.log(data);
        return data;
    } catch(error) {
        console.log(error)
        console.log(data);
        return null;
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
    getTripDatesAndDestination,
    geonamesSearch
}