const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define paths for express config
const pubDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/templates');
const partialsPath = path.join(__dirname, '../views/partials');

// Setup for handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static firectory to serve
app.use(express.static(pubDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Anthony Silveira'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'This is who we are!',
    name: 'Anthony Silveira'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    help: 'This is where you can get help for your problems.',
    title: 'Help',
    name: 'Anthony Silveira'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No Address found'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('notfound', {
    title: 'Page was not found!',
    name: 'Anthony Silveira',
    msg: 'Help article not found.'
  });
});

app.get('*', (req, res) => {
  res.render('notfound', {
    title: 'Page was not found!',
    name: 'Anthony Silveira',
    msg: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
