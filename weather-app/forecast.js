const request = require('request');

const ApiKey = ''
const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${encodeURIComponent(city)}`;
    const options = {
        url,
        json: true
    }

    request(options, (connectionError, { body: {
        current: {feelslike, temperature, weather_descriptions},
        error,
        location: {name}
    } }) => {
        if (connectionError != null) {
            callback(undefined, 'Unable to query weather API server');
        } else if (error) {
            callback(undefined, error.info);
        } else {
            const message = `${weather_descriptions[0]}. Current temperature in ${name} is ${temperature} but feels like ${feelslike}`;
            callback(message, undefined);
        }
    });
}

module.exports = forecast;
