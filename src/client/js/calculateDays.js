//calculate days away
function calulateTripDaysAway(departureDate) {
    const now = new Date();
    const tripDate = new Date(departureDate);
    const calculateDays = tripDate.getTime() - now.getTime();
    const difference = calculateDays / (1000 * 3600 * 24);
    return Math.ceil(difference);
}


export {
    calulateTripDaysAway,
}