const path = require('path');
const express = require('express');
const hbs = require('hbs');

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

app.get('/weather', (req, res, next) => {
  res.send({
    forecast: 'foggy',
    location: 'Adliswil'
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
