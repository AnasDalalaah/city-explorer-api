'use strict';
const express = require('express');
const server = express();
require('dotenv').config();
const weatherData = require('./data/weather.json');
const cors = require('cors');
server.use(cors());
//const PORT  =3001;
const PORT = process.env.PORT;


//  URl=http://localhost:3001/test
  server.get('/test', (req, res) => {
    res.send('Hello World to My Own Server')
  })

//  URl=http://localhost:3001/
 server.get('/', (req, res) => {
    res.send('Hello From the Another Side')
   })
  

//http://localhost:3001/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
server.get('/weather', (req, res) => {
    let weatherNameData = req.query.searchQuery;
    console.log(req.query.searchQuery);
    let weatherLatData = req.query.lat;
    let weatherLonData = req.query.lon;

    console.log(req.query.lat);
    console.log(req.query.lon);

    let wetherResult = weatherData.find(element => {
        if (weatherNameData.toLowerCase() == element.city_name.toLowerCase()) {
          console.log('Ammar');
            return element;
        }
    })
 
    try {

        let forecastArray = [];
        let date;
        let description;
        let forecastData;

        for (let i = 0; i < wetherResult.data.length; i++) {

            date = wetherResult.data[i].valid_date;

            description = `Low of ${wetherResult.data[i].min_temp}, high of ${wetherResult.data[i].max_temp} with ${wetherResult.data[i].weather.description}`;

            forecastData = new Forecast(date, description);

            forecastArray.push(forecastData);
        }

        res.send(forecastArray);

    } catch {
        res.status(500).send('OPS!! Your City Not Found');
    }
})

server.get('*', (req, res) => {
  res.status(404).send('page not found');})

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }


}
server.listen(PORT, () => {
  console.log(`I'm listening on port:${PORT}`);
})
