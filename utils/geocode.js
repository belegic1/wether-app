const request = require('request');
const chalk = require('chalk')

const geolocation = (address, callback) => {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoiYmVsZWdpYyIsImEiOiJja2N1aGlpcm8wanJnMnp0Mm4wNW1jdWd3In0.rhhDtGSvyIbpfYYLOJLjcQ&limit=1';

    request({ url, json: true }, (error, response) => {
        const { body } = response;
        const { features } = body;
        if (error) {
            callback({error:'unable to connect to the services'});
        } else if (features.length === 0) {
            callback({error: 'Unable to get the parameters'});
        } else {
           
            callback(undefined, {
                latitude: features[0].center[0],
                longitude: features[0].center[1],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geolocation;
