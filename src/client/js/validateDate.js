function dateChecker (date) {
    const nowDate = new Date().getTime();
    const dateToCheck = new Date(date).getTime();
    return (dateToCheck - nowDate) > 0 ? true : false;
}

export  {
    dateChecker
}