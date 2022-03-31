const request = require('request');

const ApiKey = ''

const query = 'Krakow,Poland';

const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${query}`;

const options = {
    url,
    json: true
}

request(options, (connectionError, {
    body: {
        current: {feelslike, temperature, weather_descriptions},
        error,
        location: {name}
    }
}) => {
    if (connectionError != null) {
        console.error('Unable to query weather API server', error);
    } else if (error) {
        console.error(error.info)
    } else {
        const message = `${weather_descriptions[0]}. Current temperature in ${name} is ${temperature} but feels like ${feelslike}`;
        console.log(message);
    }

})
