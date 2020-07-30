const request = require('request'); //
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (a, b, callback) => {
    const url =
        'https://api.darksky.net/forecast/9a555b458bf2052814f06ca3657e4856/' + a + ',' + b + '?lang=sr&units=si';

    request({ url, json: true }, (error, response) => {
        const { body } = response;
        if (error) {
            callback('We have an error');
        } else if (body.error) {
            callback('Invalid parameter');
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                chanceToRain: body.currently.precipProbability
            });
        }
    });
};

module.exports = forecast;
