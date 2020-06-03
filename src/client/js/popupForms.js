const { findTripName } = require('./packingList');
const { postData } = require('./serverRequests');
const { getData } = require('./serverRequests');

//event listener for new trip info buttons
document.getElementById('trips').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.new-trip-info')) {
        e.preventDefault();
        const target = e.target;
        const tripName = findTripName(target);
        const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
        popUpForm.classList.remove('hidden-form');
        popUpForm.setAttribute('id', tripName);
    }
})


//event listener for cancel buttons
document.getElementById('popup-forms').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.form-cancel')) {
        e.preventDefault();
        const target = e.target;
        const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
        popUpForm.classList.add('hidden-form');
    }
})

//event listener for submit buttons
document.getElementById('popup-forms').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.form-submit')) {
        e.preventDefault();
        const target = e.target;
        console.log('__submit ' + target.name + " form__");
        const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
        const inputArray = popUpForm.querySelectorAll('input');
        const inputData = {};
        inputArray.forEach(element => {
            inputData[element.name] = element.value;
        })
        const inputName = e.target.name;
        const tripName = findTripNameForm(target);
        const dataToPost = {'tripName': tripName, 'name': inputName, 'data': inputData};
        console.log('__data to post__');
        console.log(dataToPost);
        postData('/addAdditionalData', dataToPost).then(
            updateUiWithNewTripData(tripName, inputName)
        )
        popUpForm.classList.add('hidden-form');
    }
})


//find trip name from form target
function findTripNameForm(target) {
    for( ; target && target !== document; target = target.parentNode) {
        if(target.matches('.popup-form')){
            return target.id;
        }
    }
}

//getData and update UI
async function updateUiWithNewTripData (tripName, inputName) {
    console.log('__adding new data to UI__');
    const dataFromServer = await getData('/tripData');
    const newData = await dataFromServer[tripName][inputName]
    console.log(newData);
    const trip = document.getElementById(tripName);
    console.log(trip.id);
    console.log('.' + inputName);
    const targetDiv = trip.querySelector('.' + inputName);
    console.log(targetDiv.classList);
    targetDiv.classList.remove('hidden');
    const p = targetDiv.querySelector('p');
    p.textContent  = await newData;
}