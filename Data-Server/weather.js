'use strict';
const axios = require('axios');

module.exports = weatherHandler;

function weatherHandler(req, res) {

        let weatherQuery = req.query.city;
    
        // let weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=4d0da11d1c2943bba666b1385ce91f84
    
        let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`;
    
        axios
            .get(weatherUrl)
            .then(result => {
                const weatherDataArray = result.data.data.map(Item => {
                    return new Forecast(Item);
                })
                res.send(weatherDataArray);
                console.log(weatherDataArray)
            })
            .catch(err => {
    
                res.status(500).send(`OPS!! Your City Not Found ${err}`);
            })
    }
    class Forecast {
            constructor(ele) {
                this.date = ele.valid_date;
                this.description =this.description = `Low of ${ele.min_temp}, high of ${ele.max_temp} with ${ele.weather.description}`;
                ;
            }}