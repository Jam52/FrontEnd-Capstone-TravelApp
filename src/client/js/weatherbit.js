async function fetchWeatherData(lat, lng, startDate, endDate, key) {
    const response = await fetch(`https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lng}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=${key}`)
    const data = await response.json();
    return await data;
}

async function getWeatherBit(userInput, key) {
    const lng = userInput.lng;
    const lat = userInput.lat;
    const departureDate = userInput.departureDate; 
    const returnDate = userInput.returnDate;
    const startDate = departureDate.slice(5);
    const endDate = returnDate.slice(5);
    try {
        const response = await fetchWeatherData(lat, lng, startDate, endDate, key);
        return await response.data[0];
    } catch(error) { 
        console.log(error);
        return null;
    }
}

export {
    getWeatherBit
}