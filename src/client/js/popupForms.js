//event listener for new trip info buttons
document.getElementById('trips').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.new-trip-info')) {
        e.preventDefault();
        const target = e.target;
        const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
        popUpForm.classList.remove('hidden-form');
        popUpForm.setAttribute('id', target.name);
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
        console.log(inputArray);
        const inputData = {};
        inputArray.forEach(element => {
            inputData[element.name] = element.value;
        })
        console.log(inputData);
        popUpForm.classList.add('hidden-form');
    }
})