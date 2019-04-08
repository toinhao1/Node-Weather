const request = require('request');
const url = require('./keys');

request({ url: url, json: true }, (err, res) => {
  console.log(
    res.body.daily.data[0].summary +
      ' It is currently ' +
      res.body.currently.temperature +
      ' degress out. There is a ' +
      res.body.currently.precipProbability +
      ' percent chance of rain.'
  );
});
