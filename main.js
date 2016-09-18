var menubar = require('menubar');
var moonphase = require('./app/js/moonphase');

var options = {
  icon: 'app/img/full.png'
};

var mb = menubar(options);

mb.on('ready', function main () {
  global.moonData = moonphase.getPhaseInfo();
  console.log('Ready!');
});

