var lune = require('lune');

// Get date range for phase_range
var today = new Date();
var endDate = getEndDate();

// Load next full moon date
phases = lune.phase_range(today, endDate, lune.PHASE_FULL);
var fullMoon = new Date(phases[0]);

// Load next new moon date
phases = lune.phase_range(today, endDate, lune.PHASE_NEW);
var newMoon = new Date(phases[0]);

console.log('Next full moon is on: \n' + fullMoon);
console.log('Next new moon is on: \n' + newMoon);

// Returns the day 30 days from now
function getEndDate () {
    var date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
}
