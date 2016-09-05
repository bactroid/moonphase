var expect = require('chai').expect;
var moonphase = require('../moonphase');

var result;

describe('getMoonPhase', function () {
    it('should return Full Moon for 2015-12-25', function () {
        result = moonphase.getMoonPhase(new Date('2015-12-25 05:00'));
        expect(result).to.equal('Full Moon (100%)\n');
    });
    it ('should return Waxing Crescent for 2016-09-05', function () {
        result = moonphase.getMoonPhase(new Date('2016-09-05 05:00'))
        expect(result).to.equal('Waxing Crescent (13%)\n');
    });
});

describe('getEndDate', function() {
    it('should return 2016-01-31 for 2016-01-01', function () {
        startDate = new Date('2016-01-01 00:00 EST');
        endDate = new Date('2016-01-31 00:00 EST');
        result = moonphase.getEndDate(startDate);
        expect(result.valueOf()).to.equal(endDate.valueOf());
    });
});

describe('getNextNewMoon', function() {
    it('should return a string', function () {
        result = moonphase.getNextNewMoon(new Date());
        expect(result).to.be.a('string');
    });
});

describe('getNextFullMoon', function() {
    it('should return a string', function () {
        result = moonphase.getNextFullMoon(new Date());
        expect(result).to.be.a('string');
    });
});
