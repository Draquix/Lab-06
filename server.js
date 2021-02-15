'use strict';
console.log('server.js is connected');

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

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

app.get('/location', (req,res) => {
    const dataArrayForLocationJson = require('./data/location.json');
    const dataObjectFromJson = dataArrayForLocationJson[0];

    const searchedForCity = req.query.city;

    const newLocation = new Location(searchedForCity, dataObjectFromJson.display_name, dataObjectFromJson.lat, dataObjectFromJson.lon);

    res.send(newLocation);
});


app.use('*', (request, response) => response.send('Sorry, that is an invalid request'));
