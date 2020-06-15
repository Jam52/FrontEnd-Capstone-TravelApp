
async function getWeatherBit(userInput) {
    const lng = userInput.lng;
    const lat = userInput.lat;
    const departureDate = userInput.departureDate; 
    const returnDate = userInput.returnDate;
    const startDate = departureDate.slice(5);
    const endDate = returnDate.slice(5);
    try {
        const response = await fetch(`/weatherbit/${lng}/${lat}/${startDate}/${endDate}`);
        return await response.json();
    } catch(error) { 
        console.log(error);
        return null;
    }
}

export {
    getWeatherBit
}