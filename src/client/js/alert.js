function customAlert(alertText) {
    const alert = document.getElementById('alert');
    alert.querySelector('label').innerText = alertText;
    alert.classList.remove('hidden-form');
}

export {
    customAlert
}