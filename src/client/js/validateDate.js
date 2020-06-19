

function dateChecker (departureDate, returnDate) {
    if(departureDate === "" || returnDate === ""){
        alert('Please Enter Dates!')
        return true
    }
    const nowDate = new Date().getTime();
    const departureTime = new Date(departureDate).getTime();
    const returnTime = new Date(returnDate).getTime();
    if(departureTime < nowDate | returnTime < departureTime ) {
        alert('Invalid Dates!')
        return true;
    } 
    return false;
}


export  {
    dateChecker
}
