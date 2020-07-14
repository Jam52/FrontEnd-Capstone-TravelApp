const { getData } = require('./serverRequests');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
import { async } from 'regenerator-runtime';
import arrow  from '../images/travelApp_arrow.png';
import question from '../images/travelApp_question.png';
import { postData } from './serverRequests';
const { addPackingItem } = require('./packingList')
const { updateUiWithNewTripData } = require('./popupForms');
const { calulateTripDaysAway } = require('./calculateDays');

//add new trip to the DOM
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
    newDiv.setAttribute('class', 'trip');
    newDiv.innerHTML = await htmlLayout;
    newTripFragment.appendChild(await newDiv);

    //update initial infomation
    newTripFragment.querySelector('img').setAttribute('src', question);
    newTripFragment.querySelector('h3 span').textContent = await tripData.destination;
    newTripFragment.querySelector('.dates').textContent = await tripData.departureDate + " - " + await tripData.returnDate;
    newTripFragment.querySelector('.packing-arrow').setAttribute('src', arrow );
    newTripFragment.querySelector('.trip-footer span').textContent = calulateTripDaysAway(await tripData.departureDate);
    newTripFragment.querySelector('.tempMax').textContent = 'Temperature: ' + await tripData.temp + 'c'; 
    newTripFragment.querySelector('.tempMin').textContent = 'Cloud Cover: ' + await tripData.clouds + '%'; 
    newTripFragment.querySelector('.wind').textContent = 'Windspeed: ' + await tripData.windSpd + 'm/s';
    newTripFragment.querySelector('.rain').textContent = 'Precipitation: ' + await tripData.precip + 'mm';
    
    //update packinglist items
    if(tripData.packingList.length > 0) {
        const packingListDiv = newTripFragment.querySelector('.packing-list');
        const packingList = tripData.packingList;
        packingList.forEach(element => {
            addPackingItem(element, packingListDiv);
        })
    }

    //update additional data
    if('flights' in tripData){
        const targetDiv = newTripFragment.querySelector('.flights');
        updateUiWithNewTripData(tripName, 'flights', targetDiv);
    }

    if('lodging' in tripData){
        const targetDiv = newTripFragment.querySelector('.lodging');
        updateUiWithNewTripData(tripName, 'lodging', targetDiv);
    }

    if('notes' in tripData){
        const targetDiv = newTripFragment.querySelector('.notes');
        updateUiWithNewTripData(tripName, 'notes', targetDiv);
    }

    //append to DOM
    const trips = document.getElementById('trips');
    trips.appendChild(await newTripFragment);

    //update image
    const locationImg = document.getElementById(tripName);
    console.log(locationImg);
    if(!('imgUrl' in tripData)) {
        console.log('__pixabay__');
        const pixabay = await fetch(`/pixabay/${await tripData.destination}`);
        const pixabayData = await pixabay.json();
        console.log(await pixabayData);
        const newData = {'name': 'imgUrl', 'tripName': tripName}
        if('webformatURL' in await pixabayData){
            const webformatUrl = await pixabayData.webformatURL;
            locationImg.querySelector('img').setAttribute('src',  await webformatUrl);
            newData['data'] = await webformatUrl;
            console.log(await newData);
            postData('/addAdditionalData', await newData);
            
        }
    } else {
        locationImg.querySelector('img').setAttribute('src', tripData.imgUrl);
    }

}



export {
    addNewTripToUi,
    calulateTripDaysAway
}