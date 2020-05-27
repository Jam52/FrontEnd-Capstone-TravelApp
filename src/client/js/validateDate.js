function dateChecker (date) {
    const monthOfFeb = /\d\d(\/|-|\.)02(\/|-|\.)\d\d\d\d/;
    const monthsWithThirty = /\d\d(\/|-|\.)(04|06|09|11)(\/|-|\.)\d\d\d\d/;
    const formatRegexFeb = /(([2][0-8])|(0[1-9])|(1[0-9]))(\/|-|\.)((0[0-9])|(1[0-2]))(\/|-|\.)[2-9][0-9][0-9][0-9]/;
    const formatRegexThirty = /(([3]0)|(0[1-9])|([1-2][0-9]))(\/|-|\.)((0[0-9])|(1[0-2]))(\/|-|\.)[2-9][0-9][0-9][0-9]/;
    const formatRegexThirtyone = /(([3][0-1])|(0[1-9])|([1-2][0-9]))(\/|-|\.)((0[0-9])|(1[0-2]))(\/|-|\.)[2-9][0-9][0-9][0-9]/;
    
    if(monthOfFeb.test(date)){
        if(formatRegexFeb.test(date)){
            return true;
        } return false;
    } else if(monthsWithThirty.test(date)) {
        if(formatRegexThirty.test(date)){
            return true;
        } return false;
    } else if(formatRegexThirtyone.test(date)){
        return true;
    } else {
        return false;
    }
}

export  {
    dateChecker
}