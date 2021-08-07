'use strict';
const express = require('express');
const server = express();
require('dotenv').config();
//const weatherData = require('./data/weather.json');
const cors = require('cors');
//const axios = require('axios');
server.use(cors());
//const PORT  =3001;
const weatherHandler = require('./Data-Server/movies');
const movieHandler = require('./Data-Server/weather')
const PORT = process.env.PORT;


//  URl=http://localhost:3001/test
  server.get('/test', (req, res) => {
    res.send('Hello World to My Own Server')
  })

//  URl=http://localhost:3001/
 server.get('/', (req, res) => {
    res.send('Hello From the Another Side')
   })
   //http://localhost:3001/weather?city=paris
   server.get('/weather', weatherHandler);
   //http://localhost:3001/movie?city=Amman
   server.get('/movie', movieHandler);

//    function weatherHandler(req, res) {

//     let weatherQuery = req.query.city;

//     // let weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=4d0da11d1c2943bba666b1385ce91f84

//     let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${process.env.WEATHER_API_KEY}`;

//     axios
//         .get(weatherUrl)
//         .then(result => {
//             const weatherDataArray = result.data.data.map(Item => {
//                 return new Forecast(Item);
//             })
//             res.send(weatherDataArray);
//             console.log(weatherDataArray)
//         })
//         .catch(err => {

//             res.status(500).send(`OPS!! Your City Not Found ${err}`);
//         })
// }
// function movieHandler(req, res) {

//   let movieQuery = req.query.city;
//   let key = process.env.MOVIE_API_KEY;
//   // let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=68b1a28c997789649fdcdb75bc8a0a0f&query=amman`;
//   let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieQuery}`;
  

//   axios
//       .get(movieUrl)
//       .then(result => {
//           const movieDataArray = result.data.results.map(ele => {
//               return new Movie(ele);
            
//           })
//           res.send(movieDataArray);
//           console.log(movieDataArray)

//       })
//       .catch(err => {

//           res.status(500).send(`OPS!! Your City Not Found ${err}`);
//       })
// }

//https://api.themoviedb.org/3/movie/550?api_key=68b1a28c997789649fdcdb75bc8a0a0f
//http://localhost:3001/weather?lat=47.60621&lon=-122.33207&searchQuery=Seattle
// server.get('/weather', (req, res) => {
//     let weatherNameData = req.query.searchQuery;
//     console.log(req.query.searchQuery);
//     let weatherLatData = req.query.lat;
//     let weatherLonData = req.query.lon;

//     console.log(req.query.lat);
//     console.log(req.query.lon);

//     let wetherResult = weatherData.find(element => {
//         if (weatherNameData.toLowerCase() == element.city_name.toLowerCase()) {
//           console.log('wetherResult');
//             return element;
//         }
//     })
 
//     try {

//         let forecastArray = [];
//         let date;
//         let description;
//         let forecastData;

//         for (let i = 0; i < wetherResult.data.length; i++) {

//             date = wetherResult.data[i].valid_date;

//             description = `Low of ${wetherResult.data[i].min_temp}, high of ${wetherResult.data[i].max_temp} with ${wetherResult.data[i].weather.description}`;

//             forecastData = new Forecast(date, description);

//             forecastArray.push(forecastData);
//         }

//         res.send(forecastArray);

//     } catch {
//         res.status(500).send('OPS!! Your City Not Found');
//     }
// })

server.get('*', (req, res) => {
  res.status(404).send('page not found');})

// class Forecast {
//     constructor(ele) {
//         this.date = ele.valid_date;
//         this.description =this.description = `Low of ${ele.min_temp}, high of ${ele.max_temp} with ${ele.weather.description}`;
//         ;
//     }

// }
// class Movie {
//   constructor(item) {
//       this.title = item.original_title;
//       this.overview = item.overview;
//       this.average_votes = item.vote_average;
//       this.total_votes = item.vote_count;
//       this.image_url =  process.env.imgurl+item.poster_path;
//       this.popularity = item.popularity;
//       this.released_on = item.release_date;
      
//   }
// }
server.listen(PORT, () => {
  console.log(`I'm listening on port:${PORT}`);
})
