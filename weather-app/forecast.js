const request = require('request');

const ApiKey = ''
const forecast = (city, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${encodeURIComponent(city)}`;
    const options = {
        url,
        json: true
    }

    request(options, (connectionError, { body }) => {
        if (connectionError != null) {
            callback(undefined, 'Unable to query weather API server');
        } else if (body.error) {
            callback(undefined, body.error.info);
        } else {
            const { current: { feelslike, temperature, weather_descriptions }, location: { name }} = body;
            const message = `${weather_descriptions[0]}. Current temperature in ${name} is ${temperature} but feels like ${feelslike}`;
            callback(message, undefined);
        }
    });
}

module.exports = forecast;
