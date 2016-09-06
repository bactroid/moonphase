var lune = require('lune');
var validator = require('validator');

function getPhaseText(d) {
    var returnText = '';
    // Get date range for phase_range
    if (d === undefined) {
        var startDate = new Date();
    }

    else {
        if (validator.isDate(d)) var startDate = new Date(d + ' 05:00');
        else {
            console.error('Invalid date format');
            return;
        }
    }

    var endDate = getEndDate(startDate);
    var phases = getPhases(startDate, endDate);

    returnText = getMoonPhase(startDate) + ' (' +
                 getIlluminationPercent(startDate) + '%)\n';

    // Logic to display appropriate next moon phases
    // We don't want to describe the phases out of order.
    if (phases.newMoon > phases.fullMoon) {
        returnText += getNextFullMoon(phases.fullMoon);
        returnText += getNextNewMoon(phases.newMoon);
    }

    else {
        returnText += getNextNewMoon(phases.newMoon);
        returnText += getNextFullMoon(phases.fullMoon);
    }

    return returnText;
}

// Returns the day 30 days from startDate
function getEndDate (startDate) {
    var date = new Date(startDate.toDateString());
    date.setDate(date.getDate() + 30);
    return date;
}

// Return the current phase of the moon with a natural language response
// and a percentage
// e.g. "Waxing Crescent"
function getMoonPhase(checkDate) {
    phaseList = lune.phase_hunt(checkDate);

    // Populate 'day only' dates of the phases and user date
    var newMoon = new Date(phaseList.new_date);
    var firstQuarter = new Date(phaseList.q1_date);
    var fullMoon = new Date(phaseList.full_date);
    var lastQuarter = new Date(phaseList.q3_date);

    newMoon.setHours(0, 0, 0, 0);
    firstQuarter.setHours(0, 0, 0, 0);
    fullMoon.setHours(0, 0, 0, 0);
    lastQuarter.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    // If date's phase matches a named phase...
    // Oddly enough, these comparisons won't work without valueOf().
    if (checkDate.valueOf() === newMoon.valueOf())
        var phaseText = 'New Moon';
    else if (checkDate.valueOf() === firstQuarter.valueOf())
        var phaseText = 'First Quarter';
    else if (checkDate.valueOf() === fullMoon.valueOf())
        var phaseText = 'Full Moon';
    else if (checkDate.valueOf() === lastQuarter.valueOf())
        var phaseText = 'Last Quarter';

    // If date's phase doesn't match one of the big four...
    else if (checkDate > newMoon && checkDate < firstQuarter)
        var phaseText = 'Waxing Crescent';
    else if (checkDate > firstQuarter && checkDate < fullMoon)
        var phaseText = 'Waxing Gibbous';
    else if (checkDate > fullMoon && checkDate < lastQuarter)
        var phaseText = 'Waning Gibbous';
    else if (checkDate > lastQuarter)
        var phaseText = 'Waning Crescent';

    percent = getIlluminationPercent(checkDate);
    return phaseText;
}

function getIlluminationPercent (date) {
    phaseInfo = lune.phase(date);
    return Math.round(phaseInfo.illuminated * 100);
}

// Return an object with the next new and full moon as Date object
// properties
function getPhases(start, end) {
    var phase;
    // Load next full moon date
    phase = lune.phase_range(start, end, lune.PHASE_FULL);
    var fullMoon = new Date(phase[0]);

    // Load next new moon date
    phase = lune.phase_range(start, end, lune.PHASE_NEW);
    var newMoon = new Date(phase[0]);
    return {
        newMoon: newMoon,
        fullMoon: fullMoon
    }
}

// Return next new moon date text
function getNextNewMoon(date) {
    return 'Next new moon is on: \n' + date + '\n';
}

// Return next full moon date
function getNextFullMoon(date) {
    return 'Next full moon is on: \n' + date + '\n';
}

module.exports = {
    getPhaseText: getPhaseText,
    getIlluminationPercent: getIlluminationPercent,
    getEndDate: getEndDate,
    getMoonPhase: getMoonPhase,
    getPhases: getPhases
};