const {test} = require('tape')
const moonphase = require('./moonphase')

const dateOne = new Date('2015-12-25 05:00')
const dateTwo = new Date('2016-09-05 05:00')
const startDateText = '2016-01-01'
const startDate = new Date('2016-01-01 00:00 EST')
const endDate = new Date('2016-01-31 00:00 EST')
const knownNew = new Date('Sat Jan 09 2016 20:31:16.321 GMT-0500 (EST)')
const knownFull = new Date('Sat Jan 23 2016 20:46:20.217 GMT-0500 (EST)')

const phaseObj = {
  phaseText: 'Waning Gibbous',
  illuminationPercent: 60,
  nextFull: knownFull,
  nextNew: knownNew
}

test('getMoonPhase', assert => {
  assert.equal(moonphase.getMoonPhase(dateOne), 'Full Moon', 'Should return Full Moon for 2015-12-25')
  assert.equal(moonphase.getMoonPhase(dateTwo), 'Waxing Crescent', 'Should return Waxing Crescent for 2016-09-05')
  assert.equal(moonphase.getMoonPhase(startDate), 'Waning Gibbous', 'Should return Waning Gibbous for 2016-01-01')
  assert.equal(moonphase.getMoonPhase(endDate), 'Last Quarter', 'Should return Last Quarter for 2016-01-31')
  assert.end()
})

test('getIlluminationPercent', assert => {
  assert.equal(moonphase.getIlluminationPercent(dateOne), 100, 'Should return 100 for 2015-12-25')
  assert.equal(moonphase.getIlluminationPercent(dateTwo), 13, 'Should return 13 for 2016-09-05')
  assert.equal(moonphase.getIlluminationPercent(startDate), 60, 'Should return 60 for 2016-01-01')
  assert.equal(moonphase.getIlluminationPercent(endDate), 59, 'Should return 59 for 2016-01-31')
  assert.end()
})

test('getEndDate', assert => {
  assert.equal(moonphase.getEndDate(startDate).valueOf(), endDate.valueOf(), 'Should return 2016-01-31 for 2016-01-01')
  assert.end()
})

test('getPhases', assert => {
  const result = moonphase.getPhases(startDate, endDate)
  assert.equal(result.newMoon.valueOf(), knownNew.valueOf(), 'Should return 2016-01-09 as the new moon date')
  assert.equal(result.fullMoon.valueOf(), knownFull.valueOf(), 'Should return 2016-01-23 as the new moon date')
  assert.end()
})

test('getPhaseInfo', assert => {
  const expected = {
    phaseText: 'Waning Gibbous',
    illuminationPercent: 60,
    nextFull: knownFull,
    nextNew: knownNew
  }
  const actual = moonphase.getPhaseInfo(startDateText)
  assert.deepEqual(actual, expected, 'Should return an accurate object for a known period')
  assert.end()
})

test('getPhaseText', assert => {
  const expected = 'Waning Gibbous (60%)\n' +
                   'Next new moon is on:\n' +
                   'Sat Jan 09 2016 20:31:16 GMT-0500 (EST)\n' +
                   'Next full moon is on:\n' +
                   'Sat Jan 23 2016 20:46:20 GMT-0500 (EST)\n'
  const actual = moonphase.getPhaseText(phaseObj)
  assert.equal(actual, expected, 'Should return an expected string based on a phase object.')
  assert.end()
})

test('getPhaseList', assert => {
  const expected = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Waning Crescent'
  ]

  const actual = moonphase.getPhaseList()
  assert.deepEqual(actual, expected, 'Should return an array of expected natural language phase names.')
  assert.end()
})
