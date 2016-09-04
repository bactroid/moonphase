var lune = require('lune');

// Get date range for phase_range
var startDate = new Date();
var endDate = getEndDate(startDate);

// Load next full moon date
phases = lune.phase_range(startDate, endDate, lune.PHASE_FULL);
var fullMoon = new Date(phases[0]);

// Load next new moon date
phases = lune.phase_range(startDate, endDate, lune.PHASE_NEW);
var newMoon = new Date(phases[0]);

// Logic to display appropriate next moon phases
// We don't want to describe the phases out of order.
if (newMoon > fullMoon) {
    printNextFullMoon(fullMoon);
    printNextNewMoon(newMoon);
}

else {
    printNextNewMoon(newMoon);
    printNextFullMoon(fullMoon);
}

// Returns the day 30 days from startDate
function getEndDate (startDate) {
    var date = new Date(startDate.toDateString());
    date.setDate(date.getDate() + 30);
    return date;
}

// Log next new moon date to the console
function printNextNewMoon(date) {
    console.log('Next new moon is on: \n' + date);
}

// Log next full moon date to the console
function printNextFullMoon(date) {
    console.log('Next full moon is on: \n' + date);
}
