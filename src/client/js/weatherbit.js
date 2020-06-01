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
    const startDate = departureDate[3]+departureDate[4]+'-'+departureDate[0]+departureDate[1];
    const endDate = returnDate[3]+returnDate[4]+'-'+returnDate[0]+returnDate[1];
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