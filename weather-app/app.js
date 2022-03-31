const request = require('request');

const ApiKey = ''

const query = 'New%20York';

const url = `http://api.weatherstack.com/current?access_key=${ApiKey}&query=${query}`;

request({url}, (error, {body}) => {
    console.log(body);
})
