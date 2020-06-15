//imports
const { dateChecker } = require('./validateDate.js');
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
    const weather = await getWeatherBit(await data);
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
    console.log('departure: '+ departureDate);
    console.log('return: '+ returnDate);
    //get lng and lat using destination from userInput
    let longAndLatJson = ''
    try {
        const longAndLat = await fetch('/geonames/' + destination);
        longAndLatJson = await longAndLat.json();
        console.log(await longAndLatJson);
    } catch(error) {
        console.log(error);
        longAndLatJson = null;
    }
    
    if(dateChecker(departureDate, returnDate)) {
        console.log('datechecker() was false');
    } else if(await longAndLatJson == null) {
        alert('Invalid Desination!')
    } else if(await checkOverlappingDates(departureDate, returnDate)){
        alert('A Trip Already Exists During These Dates!')
    } else {
        alert('Trip Added!!')
        result.departureDate = departureDate;
        result.returnDate = returnDate;
        result.destination = destination;
        result.lng = await longAndLatJson.lng;
        result.lat = await longAndLatJson.lat;
        console.log('__finish getTrpAndDest__')
        console.log(result);
        return await result;
    }
}


//check data for trip with overlapping dates
async function checkOverlappingDates(departureDate, returnDate) {
    const tripData = await getData('/tripData');
    const tripDataAsString = JSON.stringify(await tripData);
    console.log('__checkingOverlappingDates');
    console.log(tripDataAsString);
    //check to see if tripData is empty
    if(tripDataAsString == '{}'){
        return false;
    }
    const departureTime = new Date(departureDate).getTime();
    const returnTime = new Date(returnDate).getTime();
    for(const trip in await tripData) {
        const existingReturnTime = new Date(await tripData[trip].returnDate).getTime();
        const existingDepartureTime = new Date(await tripData[trip].departureDate).getTime();
        if(departureTime <= existingReturnTime && returnTime >= existingDepartureTime) {
            return true;
        } else if (departureTime <= existingReturnTime && returnTime >= existingDepartureTime) {
            return true;
        } else {
            return false;
        }

    }
}


export {
    createNewTrip,
    getTripDatesAndDestination,
    checkOverlappingDates
}