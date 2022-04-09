const request = require('request');

const ApiKey = 'token';
const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${encodeURIComponent(city)}`;
    const options = {
        url,
        json: true
    }

    request(options, (connectionError, response) => {
        if (connectionError != null) {
            callback(undefined, 'Unable to query weather API server');
        } else if (response.body.error) {
            callback(undefined, response.body.error.info);
        } else {
            const message = `${(response.body.current.weather_descriptions)[0]}. Current temperature in ${(response.body.location.name)} is ${(response.body?.current.temperature)} but feels like ${(response.body.current.feelslike)}`;
            callback(message, undefined);
        }
    });
}

module.exports = forecast;
