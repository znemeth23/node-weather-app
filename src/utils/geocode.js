const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW56b2xpMjMiLCJhIjoiY2xuajE2NmNmMWtuMDJqcnVicTl0eWNmNSJ9.Ucw4-ybx5leLKr-hg8gGNg&limit=1';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;