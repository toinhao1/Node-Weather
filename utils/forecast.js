const request = require('request');

const forecast = (lat, long, callback) => {
  const url =
    'https://api.darksky.net/forecast/ee02c55043b99f151f1da260c6ad57a2/' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long);

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to weather services.', undefined);
    } else if (res.body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(
        undefined,
        res.body.daily.data[0].summary +
          ' It is currently ' +
          res.body.currently.temperature +
          ' degress out. There is a ' +
          res.body.currently.precipProbability +
          ' percent chance of rain.'
      );
    }
  });
};

module.exports = forecast;
