const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const moonphase = require('./app/js/moonphase')

const iconPath = path.join(__dirname, './app/img/icon.png');
let appIcon = null;
let win = null;

app.on('ready', function () {
    win = new BrowserWindow({show: false});
    tray = new Tray(iconPath);
    moonData = moonphase.getPhaseInfo();

    phaseAndIllumination = moonData.phaseText;
    phaseAndIllumination += ' (';
    phaseAndIllumination += moonData.illuminationPercent;
    phaseAndIllumination += '%)';

    var contextMenu = Menu.buildFromTemplate([
        {
            label: phaseAndIllumination
        },
        {
            label: 'Next Full Moon: ' + moonData.nextFull
        },
        {
            label: 'Next New Moon: ' + moonData.nextNew
        }
    ]);

    tray.setToolTip(moonData.phaseText);
    tray.setContextMenu(contextMenu);

    tray.on('click', function () {
        tray.popUpContextMenu(contextMenu);
    });
});
