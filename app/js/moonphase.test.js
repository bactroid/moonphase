const expect = require('chai').expect
const moonphase = require('./moonphase')

const dateOne = new Date('2015-12-25 05:00')
const dateTwo = new Date('2016-09-05 05:00')
const startDateText = '2016-01-01'
const startDate = new Date('2016-01-01 00:00 EST')
const endDate = new Date('2016-01-31 00:00 EST')
const knownNew = new Date('Sat Jan 09 2016 20:31:16.321 GMT-0500 (EST)')
const knownFull = new Date('Sat Jan 23 2016 20:46:20.217 GMT-0500 (EST)')

describe('getMoonPhase', () => {
  it('should return Full Moon for 2015-12-25', () => {
    const result = moonphase.getMoonPhase(dateOne)
    expect(result).to.equal('Full Moon')
  })
  it('should return Waxing Crescent for 2016-09-05', () => {
    const result = moonphase.getMoonPhase(dateTwo)
    expect(result).to.equal('Waxing Crescent')
  })
  it('should return Waning Gibbous for 2016-01-01', () => {
    const result = moonphase.getMoonPhase(startDate)
    expect(result).to.equal('Waning Gibbous')
  })
  it('should return Last Quarter for 2016-01-31', () => {
    const result = moonphase.getMoonPhase(endDate)
    expect(result).to.equal('Last Quarter')
  })
})

describe('getIlluminationPercent', () => {
  it('should return 100 for 2015-12-25', () => {
    const result = moonphase.getIlluminationPercent(dateOne)
    expect(result).to.equal(100)
  })
  it('should return 13 for 2016-09-05', () => {
    const result = moonphase.getIlluminationPercent(dateTwo)
    expect(result).to.equal(13)
  })
  it('should return 60 for 2016-01-01', () => {
    result = moonphase.getIlluminationPercent(startDate)
    expect(result).to.equal(60)
  })
  it('should return 59 for 2016-01-31', () => {
    const result = moonphase.getIlluminationPercent(endDate)
    expect(result).to.equal(59)
  })
})

describe('getEndDate', () => {
  it('should return 2016-01-31 for 2016-01-01', () => {
    const result = moonphase.getEndDate(startDate)
    expect(result.valueOf()).to.equal(endDate.valueOf())
  })
})

describe('getPhases', () => {
  it('should return correct phase dates for a known period', () => {
    const result = moonphase.getPhases(startDate, endDate)
    expect(result.newMoon.valueOf()).to.equal(knownNew.valueOf())
    expect(result.fullMoon.valueOf()).to.equal(knownFull.valueOf())
  })
})

describe('getPhaseInfo', () => {
  it('should return an accurate object for a known period', () => {
    const result = moonphase.getPhaseInfo(startDateText)
    expect(result.phaseText).to.equal('Waning Gibbous')
    expect(result.illuminationPercent).to.equal(60)
    expect(result.nextNew.valueOf()).to.equal(knownNew.valueOf())
    expect(result.nextFull.valueOf()).to.equal(knownFull.valueOf())
  })
  it('should return nothing if date format is invalid', () => {
    const result = moonphase.getPhaseInfo('notadate')
    expect(result).to.equal(undefined)
  })
})

describe('getPhaseText', () => {
  it('should return empty string if date format is invalid', () => {
    const result = moonphase.getPhaseText('notadate')
    expect(result).to.equal('')
  })
})
