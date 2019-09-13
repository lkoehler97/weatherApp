/* Powered by Dark Sky */

const request = require('request');

const apiKey = '631194510ebcaf7de9804f550c1088fc';
const flags  = '?units=si';

/**
 * Get the current weather at a specific position. 
 * @param {number}   latitude  The latitude of the position.
 * @param {number}   longitude The longitude of the position.
 * @param {function} callback  The function to call when ready.
 */
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}${flags}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const currentWeather = body.currently;
            const summary = body.daily.data[0].summary;
            const temperature = currentWeather.temperature;
            const low         = body.daily.data[0].temperatureLow;
            const high        = body.daily.data[0].temperatureHigh;
            callback(undefined, summary + ' It is currently ' + temperature + '°C outside. There is a ' + currentWeather.precipProbability + '% chance of rain. ' +
                                'The temperature low for today is ' + low + '°C and the high is ' + high + '°C.');
        }
    });
};

module.exports = forecast;