const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoidG9pbmhhbzEiLCJhIjoiY2p1OWs1ajBsMWZ3NjQ0azk5M3U3ZHJqZyJ9.W9uq1xXM5yw11PCySMWNfw';

  request({ url, json: true }, (err, res) => {
    const { center, place_name, features } = res.body;
    if (err) {
      callback('Unable to connect to location services.', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = geocode;
