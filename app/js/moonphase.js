const lune = require('lune')
const validator = require('validator')

const getPhaseInfo = date => {
  const startDate = getStartDate(date)

  if (startDate === null) return

  const nextPhases = getPhases(startDate, getEndDate(startDate))
  return {
    phaseText: getMoonPhase(startDate),
    illuminationPercent: getIlluminationPercent(startDate),
    nextNew: nextPhases.newMoon,
    nextFull: nextPhases.fullMoon
  }
}

// Returns a detailed string formatted for console display
const getPhaseText = phaseInfo => {
  const makePhaseString = obj => obj.phaseText + ' (' + obj.illuminationPercent + '%)\n'

  // Logic to display appropriate next moon phases
  // We don't want to describe the phases out of order.
  const makeNextPhasesString = obj =>
    phaseInfo.nextNew > phaseInfo.nextFull
      ? formatPhaseText(phaseInfo.nextFull, 'full') + formatPhaseText(phaseInfo.nextNew, 'new')
      : formatPhaseText(phaseInfo.nextNew, 'new') + formatPhaseText(phaseInfo.nextFull, 'full')

  return makePhaseString(phaseInfo) + makeNextPhasesString(phaseInfo)
}

// Returns the day 30 days from startDate
const getEndDate = startDate => {
  let date = new Date(startDate.toDateString())
  date.setDate(date.getDate() + 30)
  return date
}

// Return the current phase of the moon with a natural language response
// e.g. "Waxing Crescent"
const getMoonPhase = date => {
  const dayOnly = getDayOnlyPhases(date)
  const isNewMoon = date => date.valueOf() === dayOnly.newMoon.valueOf()
  const isFirstQuarter = date => date.valueOf() === dayOnly.firstQuarter.valueOf()
  const isFullMoon = date => date.valueOf() === dayOnly.fullMoon.valueOf()
  const isLastQuarter = date => date.valueOf() === dayOnly.lastQuarter.valueOf()
  const isWaxingCrescent = date => date > dayOnly.newMoon && date < dayOnly.firstQuarter
  const isWaxingGibbous = date => date > dayOnly.firstQuarter && date < dayOnly.fullMoon
  const isWaningGibbous = date => date > dayOnly.fullMoon && date < dayOnly.lastQuarter
  const isWaningCrescent = date => date > dayOnly.lastQuarter

  return isNewMoon(date) ? 'New Moon'
       : isFirstQuarter(date) ? 'First Quarter'
       : isFullMoon(date) ? 'Full Moon'
       : isLastQuarter(date) ? 'Last Quarter'
       : isWaxingCrescent(date) ? 'Waxing Crescent'
       : isWaxingGibbous(date) ? 'Waxing Gibbous'
       : isWaningGibbous(date) ? 'Waning Gibbous'
       : isWaningCrescent(date) ? 'Waning Crescent' : null
}

// Return an integer representation the moon's percentage of illumination on a given date
const getIlluminationPercent = date => Math.round(lune.phase(date).illuminated * 100)

// Return an object with the next new and full moon as Date object properties
const getPhases = (start, end) => ({
  newMoon: new Date(lune.phase_range(start, end, lune.PHASE_NEW)[0]),
  fullMoon: new Date(lune.phase_range(start, end, lune.PHASE_FULL)[0])
})

// Return an array of natural language moon phases used in this library
const getPhaseList = () =>
  [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Waning Crescent'
  ]

// PRIVATE FUNCTIONS

// Return a string declaring the date when a given phase will be
const formatPhaseText = (date, phase) => 'Next ' + phase + ' moon is on:\n' + date + '\n'

// Return object with 'day only' dates of the phases and user date
const getDayOnlyPhases = date => {
  const phaseList = lune.phase_hunt(date)
  let newMoon = new Date(phaseList.new_date)
  let firstQuarter = new Date(phaseList.q1_date)
  let fullMoon = new Date(phaseList.full_date)
  let lastQuarter = new Date(phaseList.q3_date)

  newMoon.setHours(0, 0, 0, 0)
  firstQuarter.setHours(0, 0, 0, 0)
  fullMoon.setHours(0, 0, 0, 0)
  lastQuarter.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)

  return {date, newMoon, firstQuarter, fullMoon, lastQuarter}
}

// Returns a Date object based on user input
const getStartDate = date =>
    date === undefined ? new Date()
  : validator.isDate(date) ? new Date(date + ' 05:00') : null

module.exports = {
  getPhaseInfo,
  getPhaseText,
  getIlluminationPercent,
  getEndDate,
  getMoonPhase,
  getPhases,
  getPhaseList
}
