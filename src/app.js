const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../utils/geocode');

const forecast = require('../utils/forecast');

const publicPathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = port.env.PORT || 3000

app.use(express.static(publicPathDirectory));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', { title: 'Vremenska progoza', name: 'Dragan Belegic' });
});

app.get('/weather', (req, res) => {
    geocode.location = req.query.address;
    const arg = geocode.location;
    if (!req.query.address) {
        res.send({
            error: 'No address provided'
        });
    } else {
        geocode(arg, (error, data) => {
            const { location, latitude, longitude } = data;
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    location: location,
                    data: forecastData
                });
            });
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide a search term'
        });
    }
    res.send({
        location: 'mojkovac'
    });
});

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help PAge...', message: 'We are heare to help you', name: 'Dragan Belegic' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About me', name: 'Dragan Belegic' });
});

app.get('/help/*', (req, res) => {
    res.render('help-404', { message: 'Help method is not found' });
});

app.get('*', (req, res) => {
    res.render('404', { message: 'Page not found..' });
});

app.listen(port, () => {
    console.log('Listenning..');
});
