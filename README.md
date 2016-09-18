# moonphase

NPM module to display the current moon phase and along with the next new and full moon.

Currently running from the command line, but hopefully eventually running as a system tray app using Electron.

## Usage
```
moonphase [date]
```

The optional `date` parameter should be formatted as an ISO 8601 date (YYYY-MM-DD).

## Dependencies

### lune

Uses Lune by Ryan Seys for lunar phase calculations. Hooray for standing on the shoulders of giants because I was *not* looking forward to working out those calculations.

NPM: https://www.npmjs.com/package/lune  
GitHub: https://github.com/ryanseys/lune

### menubar
I originally started down the path of rolling my own menu bar, but I quickly discovered that Max Ogden had already done the work for me.

NPM: https://www.npmjs.com/package/menubar
GitHub: https://github.com/maxogden/menubar

### validator

Used for validation of user input.

NPM: https://www.npmjs.com/package/validator  
GitHub: https://github.com/chriso/validator.js

## Icon Credits

First Quarter Moon by MarkieAnn Packer from the Noun Project  
New Moon by MarkieAnn Packer from the Noun Project  
Waxing Crescent Moon by MarkieAnn Packer from the Noun Project  
Waxing Gibbous Moon by MarkieAnn Packer from the Noun Project  
Waning Crescent Moon by MarkieAnn Packer from the Noun Project  
Third Quarter Moon by MarkieAnn Packer from the Noun Project  
Waning Gibbous Moon by MarkieAnn Packer from the Noun Project  
Full Moon by MarkieAnn Packer from the Noun Project  

https://creativecommons.org/licenses/by/3.0/us/
