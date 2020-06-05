//calculate days away
function calulateTripDaysAway(departureDate) {
    const now = new Date();
    const formatedDate = formatDate(departureDate);
    const tripDate = new Date(formatedDate);
    const calculateDays = tripDate.getTime() - now.getTime();
    const difference = calculateDays / (1000 * 3600 * 24);
    return Math.ceil(difference);
}

function formatDate(date) {
    const formatedDate = date[3] + date[4] + '/' + date[0] + date[1] + '/' + date.slice(6);
    return formatedDate;
}

export {
    calulateTripDaysAway,
    formatDate
}