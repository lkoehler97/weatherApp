/* Powered by Mapbox */

const request = require('request');

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + 
                '.json?access_token=pk.eyJ1Ijoid2Fyc2FrdWwiLCJhIjoiY2swZGtxYWEwMDhkNjNubHF1aXB2NzAwciJ9.ZNQaLueCc5u_8XHoiwXZdA&limit=1';

    request( { url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location: ' + adress, undefined);
        } else {
            callback(undefined, {
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;