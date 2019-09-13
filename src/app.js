const express = require('express');
const path    = require('path');
const hbs     = require('hbs');

const geocode  = require('./utils/geocode');
const forecast = require('./utils/forecast');

/* Initialize the Express server */
const app = express();

/* Setup server specifications */
const port = 3000;

/* Define paths for Express config */
const publicDirPath   = path.join(__dirname, '../public');
const viewsDirPath    = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

/* Setup handlebars engine and views directory */
app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

/* Setup static directory to serve */
app.use(express.static(publicDirPath));

/* Setup routing */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lukas Koehler', 
        year: '2019'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lukas Koehler',
        year: '2019'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lukas Koehler',
        year: '2019',
        helpMessage: 'This is a help message'
    })
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No address provided.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lukas Koehler',
        year: '2019',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Lukas Koehler',
        year: '2019',
        errorMessage: 'Page not found!'
    });
});

/* Start server */ 
app.listen(port, () => {
    console.log('Server started on port ' + port + '.');
});
