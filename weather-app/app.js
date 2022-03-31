const request = require('request');

const ApiKey = ''

const query = 'Krakow,Poland';

const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${query}`;

const options = {
    url,
    json: true
}

request(options, (error, { body }) => {
    if (error != null){
        throw Error('Sorry', error);
    }
    const { current: { feelslike, temperature }} = body;
    const message = `Current temperature in ${query} is ${temperature} but feels like ${feelslike}`;
    console.log(message);
})
