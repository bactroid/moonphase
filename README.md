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

### validator

Used for validation of user input.

NPM: https://www.npmjs.com/package/validator  
GitHub: https://github.com/chriso/validator.js
