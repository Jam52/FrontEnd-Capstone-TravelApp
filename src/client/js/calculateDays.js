//calculate days away
function calulateTripDaysAway(departureDate) {
    const now = new Date();
    const formatDate = departureDate[3] + departureDate[4] + '/' + departureDate[0] + departureDate[1] + '/' + departureDate.slice(6);
    const tripDate = new Date(formatDate);
    const calculateDays = tripDate.getTime() - now.getTime();
    const difference = calculateDays / (1000 * 3600 * 24);
    return Math.ceil(difference);
}

export {
    calulateTripDaysAway
}