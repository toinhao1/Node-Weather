const express = require('express');
const path = require('path');

const app = express();
const pubDirectory = path.join(__dirname, './public');

app.use(express.static(pubDirectory));

app.get('/weather', (req, res, next) => {
  res.send({
    forecast: 'foggy',
    location: 'Adliswil'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
