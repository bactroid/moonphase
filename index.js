var lune = require('lune');

// Get date range for phase_range
var today = new Date();
var endDate = getEndDate();

phases = lune.phase_range(today, endDate, lune.PHASE_FULL);
var fullMoon = new Date(phases[0]);

phases = lune.phase_range(today, endDate, lune.PHASE_NEW);
var newMoon = new Date(phases[0]);

if (fullMoon > today) {
    console.log('Next full moon is on: \n' + fullMoon);
}

if (newMoon > today) {
    console.log('Next new moon is on: \n' + newMoon);
}

function getEndDate () {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
}
