const request = require('request');

const url =
  'https://api.darksky.net/forecast/ee02c55043b99f151f1da260c6ad57a2/37.8267,-122.4233';

request({ url: url }, (err, res) => {
  const data = JSON.parse(res.body);
  console.log(data.currently);
});
