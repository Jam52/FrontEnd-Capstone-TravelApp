function dateChecker (date) {
    const formatRegex = /(([3][0-1])|([0-2][0-9]))(\/|-|\.)((0[0-9])|(1[0-2]))(\/|-|\.)[2-9][0-9][0-9][0-9]/;
    if (formatRegex.test(date)) {
        return true
    } else {
        return false;
    }
}

export  {
    dateChecker
}