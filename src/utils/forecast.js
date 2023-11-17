const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a0ca6ffa0b96e57c90ce7889c0360ede&query=' + lat + ',' + long;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const currentWeather = body.current;
            const currentLocation = body.location;
            callback(undefined, 'In ' + currentLocation.name + ', ' + currentLocation.country + ', it is currently ' + currentWeather.temperature
                + '°C (feels like ' + currentWeather.feelslike + '°C) and the chance of precipitation is ' + currentWeather.precip + '%.'
            );
        }
    });
};

module.exports = forecast;