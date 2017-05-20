const menubar = require('menubar')
const path = require('path')
const moonphase = require('./app/js/moonphase')

const options = {
  icon: 'app/img/full@2x.png'
}

const mb = menubar(options)

mb.on('ready', function main () {
  global.moonData = moonphase.getPhaseInfo()
  console.log('Ready!')
})
