var expect = require('chai').expect;
var moonphase = require('./moonphase');

var dateOne = new Date('2015-12-25 05:00');
var dateTwo = new Date('2016-09-05 05:00');
var startDateText = '2016-01-01';
var startDate = new Date('2016-01-01 00:00 EST');
var endDate = new Date('2016-01-31 00:00 EST');
var knownNew = new Date('Sat Jan 09 2016 20:31:16.321 GMT-0500 (EST)');
var knownFull = new Date('Sat Jan 23 2016 20:46:20.217 GMT-0500 (EST)');


describe('getMoonPhase', function () {
    let result;
    it('should return Full Moon for 2015-12-25', function () {
        result = moonphase.getMoonPhase(dateOne);
        expect(result).to.equal('Full Moon');
    });
    it ('should return Waxing Crescent for 2016-09-05', function () {
        result = moonphase.getMoonPhase(dateTwo);
        expect(result).to.equal('Waxing Crescent');
    });
    it('should return Waning Gibbous for 2016-01-01', function () {
        result = moonphase.getMoonPhase(startDate);
        expect(result).to.equal('Waning Gibbous');
    });
    it('should return Last Quarter for 2016-01-31', function () {
        result = moonphase.getMoonPhase(endDate);
        expect(result).to.equal('Last Quarter');
    });
});

describe('getIlluminationPercent', function () {
  let result;
    it('should return 100 for 2015-12-25', function () {
        result = moonphase.getIlluminationPercent(dateOne);
        expect(result).to.equal(100);
    });
    it ('should return 13 for 2016-09-05', function () {
        result = moonphase.getIlluminationPercent(dateTwo);
        expect(result).to.equal(13);
    });
    it('should return 60 for 2016-01-01', function () {
        result = moonphase.getIlluminationPercent(startDate);
        expect(result).to.equal(60);
    });
    it('should return 59 for 2016-01-31', function () {
        result = moonphase.getIlluminationPercent(endDate);
        expect(result).to.equal(59);
    });
});

describe('getEndDate', function () {
  let result;
    it('should return 2016-01-31 for 2016-01-01', function () {
        result = moonphase.getEndDate(startDate);
        expect(result.valueOf()).to.equal(endDate.valueOf());
    });
});

describe('getPhases', function () {
  let result;
    it('should return correct phase dates for a known period', function () {
        result = moonphase.getPhases(startDate, endDate);
        expect(result.newMoon.valueOf()).to.equal(knownNew.valueOf());
        expect(result.fullMoon.valueOf()).to.equal(knownFull.valueOf());
    });
});

describe('getPhaseInfo', function () {
  let result;
    it('should return an accurate object for a known period', function() {
        result = moonphase.getPhaseInfo(startDateText);
        expect(result.phaseText).to.equal('Waning Gibbous');
        expect(result.illuminationPercent).to.equal(60);
        expect(result.nextNew.valueOf()).to.equal(knownNew.valueOf());
        expect(result.nextFull.valueOf()).to.equal(knownFull.valueOf());
    });
    it('should return nothing if date format is invalid', function() {
        result = moonphase.getPhaseInfo('notadate');
        expect(result).to.equal(undefined);
    });
});

describe('getPhaseText', function () {
  let result;
    it('should return empty string if date format is invalid', function () {
        result = moonphase.getPhaseText('notadate');
        expect(result).to.equal('');
    });
});
