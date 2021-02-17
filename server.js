'use strict';
console.log('server.js is connected');

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

app.use(express.static('/public'));
app.use(cors());


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

function Location(searchedCity, display_name, latitude, longitude) {
    this.searchedCity = searchedCity;
    this.formatted_query = display_name;
    this.latitude = parseFloat(latitude);
    this.longitude = parseFloat(longitude);
}

function Weather(weather,valid_date) {
    this.forecast = weather;
    this.time = valid_date;
}

app.get('/location', (req,res) => {
    const dataArrayForLocationJson = require('./data/location.json');
    const dataObjectFromJson = dataArrayForLocationJson[0];

    const searchedForCity = req.query.city;

    const newLocation = new Location(searchedForCity, dataObjectFromJson.display_name, dataObjectFromJson.lat, dataObjectFromJson.lon);

    res.send(newLocation);
    
})
// .catch(error => {
//     res.status(500).send('location query failed');
// });

app.get('/weather', (req,res) => {
    //const dataArrayForWeatherJson = require('./data/weather.json');
    //const dataObjectFromJson = dataArrayForWeatherJson.data[0];
    const apiKey = process.env.APIKEY_WEATHER;
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const url = `https://api.weatherbit.io/v2.0/current?${lat}&${lon}&key=${apiKey}`

    superagent.get(url).then( () => { 
        const forecast = dataReturned.data.weather.description;
        const time = dataReturned.data.datetime;
        res.send(forecast, time);
    });
    //const newWeather = new Weather (dataObjectFromJson.weather.description,dataObjectFromJson.valid_date);
    
    //res.send(newWeather);
})
// .catch(error => {
//     res.status(500).send('weather query failed');
// });


app.use('*', (request, response) => response.send('Sorry, that is an invalid request'));
