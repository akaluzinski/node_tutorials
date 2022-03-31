const forecast = require('./forecast');

forecast('Krakow,Poland', (error, success) => {
    if (success) {
        console.log(success)
    } else {
        console.error(error);
    }
});
