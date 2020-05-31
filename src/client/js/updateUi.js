const { getData } = require('./serverRequests');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
import { async } from 'regenerator-runtime';
import arrow from '../images/travelApp_arrow.png';

//addtrip to the DOM
async function addNewTripToUi(tripName) {
    //get trip data
    const allTripData = await getData('/tripData');
    const tripData = await allTripData[tripName];

    //fetch html layout
    const htmlLayout = fetchHtmlAsText('/trip');
    const newTripFragment = document.createDocumentFragment();
    const newDiv = document.createElement('div');
    const divId = (await tripData.destination)+(await tripData.departureDate);
    newDiv.setAttribute('id', await divId);
    newDiv.innerHTML = await htmlLayout;
    newTripFragment.appendChild(await newDiv);

    //update initial infomation
    newTripFragment.querySelector('img').setAttribute('src', await tripData.imgUrl);
    newTripFragment.querySelector('h3 span').textContent = await tripData.destination;
    newTripFragment.querySelector('.dates').textContent = await tripData.departureDate + " - " + await tripData.returnDate;
    newTripFragment.querySelector('.packing-arrow').setAttribute('src', arrow );
    newTripFragment.querySelector('.trip-footer span').textContent = calulateTripDaysAway(await tripData.departureDate);

    
    //append to DOM
    const trips = document.getElementById('trips');
    trips.appendChild(await newTripFragment);
}


//calculate days away
function calulateTripDaysAway(departureDate) {
    const now = new Date();
    console.log(now);
    const formatDate = departureDate[3] + departureDate[4] + '/' + departureDate[0] + departureDate[1] + '/' + departureDate.slice(6);
    const tripDate = new Date(formatDate);
    console.log(tripDate);
    const calculateDays = tripDate.getTime() - now.getTime();
    const difference = calculateDays / (1000 * 3600 * 24);
    console.log(difference);
    return Math.ceil(difference);
}

export {
    addNewTripToUi,
    calulateTripDaysAway
}