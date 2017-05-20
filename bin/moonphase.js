#!/usr/bin/env node

var moonphase = require('../app/js/moonphase')
console.log(moonphase.getPhaseText(moonphase.getPhaseInfo(process.argv[2])))
