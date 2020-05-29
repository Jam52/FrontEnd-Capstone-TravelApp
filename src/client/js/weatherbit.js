const weatherbitKey = '327a6c289fd04805a16fea72bbed7a9a';

async function getWeatherBit(lng, lat, departureDate, returnDate) {
    const startDate = departureDate[3]+departureDate[4]+'-'+departureDate[0]+departureDate[1];
    const endDate = returnDate[3]+returnDate[4]+'-'+returnDate[0]+returnDate[1];
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/normals?lat=${lat}&lon=${lng}&start_day=${startDate}&end_day=${endDate}&tp=daily&key=${weatherbitKey}`)
        const data = await response.json();
        return await data.data[0];
    } catch(error) {
        console.log(error);
        return null;
    }
}

export {
    getWeatherBit
}