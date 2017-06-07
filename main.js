const menubar = require('menubar')
const moonphase = require('./app/js/moonphase')
const _ = require('lodash')

const mb = menubar()

const buildIconObject = (path = `${__dirname}/app/img/`, retina = true) => {
  const phaseList = moonphase.getPhaseList()

  const reducer = (path, retina) => (obj, item) => {
    const suffix = retina ? '@2x' : ''
    obj[item] = path + _.camelCase(item) + suffix + '.png'
    return obj
  }

  return phaseList.reduce(reducer(path, retina), {})
}

mb.on('ready', function main () {
  const phaseInfo = moonphase.getPhaseInfo()
  const moonIcons = buildIconObject()
  mb.tray.setImage(moonIcons[phaseInfo.phaseText])
  global.moonData = phaseInfo
  console.log('Ready!')
})
