const key = '16824419-68f454e4a716b1c3b2a8d63f6';


async function fetchPixabay(destination) {
    const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${destination}&lang=en&category=travel&order=popular`);
    const responseJson = await response.json();
    console.log(await responseJson.hits[0]);
    const pictureUrl = await responseJson.hits[0].webformatURL;
    return await pictureUrl;
}

export {
    fetchPixabay
}