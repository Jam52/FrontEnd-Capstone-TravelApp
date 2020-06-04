const { findTripName } = require('./packingList');
const { postData } = require('./serverRequests');
const { getData } = require('./serverRequests');
const { deleteTrip } = require('./serverRequests');


// function to show popup forms
function showPopupForms(target) {
    const tripName = findTripName(target);
    const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
    popUpForm.classList.remove('hidden-form');
    popUpForm.setAttribute('id', tripName);
}


//popup form submit button function
function popupFormSubmit(target) {
    console.log('__submit ' + target.name + " form__");
    const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
    const inputArray = popUpForm.querySelectorAll('input');
    const inputData = {};
    inputArray.forEach(element => {
        inputData[element.name] = element.value;
    })
    const inputName = target.name;
    const tripName = findTripNameForm(target);
    const dataToPost = {'tripName': tripName, 'name': inputName, 'data': inputData};
    console.log('__data to post__');
    console.log(dataToPost);
        
    const trip = document.getElementById(tripName);
    const targetDiv = trip.querySelector('.' + inputName);
    postData('/addAdditionalData', dataToPost).then(
        updateUiWithNewTripData(tripName, inputName, targetDiv)
    )
    popUpForm.classList.add('hidden-form');
}


//delete trip from server and DOM
function removeTrip(target) {
    //find tripName
    const tripName = findTripNameForm(target);
    //delete trip from server
    deleteTrip('/deleteTrip', tripName);
    //remove trip from ui
    document.getElementById(tripName).remove();
     //hide popup form
     const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
     popUpForm.classList.add('hidden-form');
}


//find trip name from form target
function findTripNameForm(target) {
    for( ; target && target !== document; target = target.parentNode) {
        if(target.matches('.popup-form')){
            return target.id;
        }
    }
}

//getData and update UI
async function updateUiWithNewTripData(tripName, inputName, targetDiv) {
    console.log('__adding new data to UI__');
    //get data
    const data = await getData('./tripData');
    const newTripData = await data[tripName][inputName];
    //remove class 'hidden' to display in the dom
    targetDiv.classList.remove('hidden');
    //querry paragraph to update
    const p = targetDiv.querySelector('p');

    //Turn data into required HTMLtext format
    let formatedData = '';
    for(const [key, value] of Object.entries(newTripData)){
        if(key != 'notes') {
            const keyWithSpaces = key.replace('-', ' ');
            formatedData += `${keyWithSpaces}: ${value} <br>`;
        } else {
            formatedData += `${value} <br>`;
        }
        
    }
    console.log(formatedData);
    p.innerHTML  = formatedData;
}

export {
    updateUiWithNewTripData,
    removeTrip,
    popupFormSubmit,
    showPopupForms
}