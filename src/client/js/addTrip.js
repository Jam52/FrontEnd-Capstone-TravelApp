//imports
const { dateChecker } = require('./validateDate.js');
const { fetchGeonames } = require('./fetchGeonames.js');
const { getWeatherBit } = require('./weatherbit.js');
const { fetchPixabay } = require('./fetchPixabay');
const { addNewTripToUi } = require('./updateUi');
const { getData } = require('./serverRequests');
const { postData } = require('./serverRequests');
const { async } = require('regenerator-runtime');
const { formatDate } = require('./calculateDays');

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
    //add img url to userInput data
    const imgUrl = await fetchPixabay(await data.destination);
    data.imgUrl = await imgUrl;
    //postData to the server
    postData('/newTrip', await data).then(
        addNewTripToUi(await data.destination + await data.departureDate)
    );
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
    } else if(await checkOverlappingDates(departureDate, returnDate) === true){
        alert('A trip already exists during these dates!')
    } else {
        alert('Trip Added!!')
        result.departureDate = departureDate.replace(/\//g, "-");
        result.returnDate = returnDate.replace(/\//g, "-");
        result.destination = destination;
        result.lng = longAndLat.lng;
        result.lat = longAndLat.lat;
        return result;
    }
}

//check data for trip with overlapping dates
async function checkOverlappingDates(departureDate, returnDate) {
    const tripData = await getData('/tripData');
    const tripDataAsString = JSON.stringify(await tripData);
    console.log(tripDataAsString);
    //check to see if tripData is empty
    if(tripDataAsString == '{}'){
        return false;
    }
    const departureTime = new Date(formatDate(departureDate)).getTime();
    const returnTime = new Date(formatDate(returnDate)).getTime();
    for(const trip in await tripData) {
        const existingReturnTime = new Date(formatDate(await tripData[trip].returnDate)).getTime();
        const existingDepartureTime = new Date(formatDate(await tripData[trip].departureDate)).getTime();
        if(departureTime <= existingReturnTime && returnTime >= existingDepartureTime) {
            return true;
        } else if (departureTime <= existingReturnTime && returnTime >= existingDepartureTime) {
            return true;
        } else {
            return false;
        }

    }
}

//geonames fetch function returning only required infomation
async function geonamesSearch(location){
    const data = {};
    try {
        const geonames = await fetchGeonames(location);
        data.lng = await geonames.geonames[0].lng;
        data.lat = await geonames.geonames[0].lat;
        return data;
    } catch(error) {
        console.log(error)
        console.log(data);
        return null;
    }

}


export {
    createNewTrip,
    getTripDatesAndDestination,
    geonamesSearch,
    checkOverlappingDates
}