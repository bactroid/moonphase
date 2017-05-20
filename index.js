var moonphase = require('./app/js/moonphase')
process.stdout.write(moonphase.getPhaseText(process.argv[2]))
