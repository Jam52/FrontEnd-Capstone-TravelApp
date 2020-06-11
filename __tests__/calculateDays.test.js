const { calulateTripDaysAway } = require('../src/client/js/calculateDays');

test('test for calculate days away from current date ', () => {
    const now = new Date();
    let day =  now.getDate().toString();
    if(day.length == 1) {
        day = '0' + day;
    }
    let month =  (now.getMonth()+1).toString();
    if(month.length == 1) {
        month = '0' + month;
    }
    const inOneYear = (now.getFullYear()+1).toString() + '/' + month + '/' + day;
    console.log(inOneYear);
    expect(calulateTripDaysAway(inOneYear)).toBe(365);
})