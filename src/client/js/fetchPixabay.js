const key = '16824419-68f454e4a716b1c3b2a8d63f6';
import question from '../images/travelApp_question.png';


async function fetchPixabay(destination) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${key}&q=${destination}&lang=en&category=travel&order=popular`);
        const responseJson = await response.json();
        console.log(await responseJson.hits[0]);
        if('webformatURL' in await responseJson.hits[0] ){
            return await responseJson.hits[0].webformatURL;
        }
    } catch(error) {
        return question;
    }
}

export {
    fetchPixabay
}