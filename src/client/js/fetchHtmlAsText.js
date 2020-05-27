//fetch trip template
async function fetchHtmlAsText(url) {
    const htmlFile = await fetch(url);
    const text = await htmlFile.text();
    return await text;
}

export {
    fetchHtmlAsText
}