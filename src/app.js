const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Enzo',
        message: 'StormAndFury weather station',
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'Enzo',
        message: 'About us',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Enzo',
        message: 'Get help',
    });
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        });
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error: 'Error: ' + error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Error: ' + error
                });
            }
            return res.send({
                searchTerm: location,
                forecast: forecastData,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Not found',
        name: 'Enzo',
        message: 'Help article not found',
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not found',
        name: 'Enzo',
        message: 'Page not found',
    });
});

app.listen(3000, () => {
    console.log('Server is awake.');
});