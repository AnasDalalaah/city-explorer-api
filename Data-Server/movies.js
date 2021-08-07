'use strict';
const axios = require('axios');

module.exports = movieHandler;
let inMemory = {};

function movieHandler(req, res) {

      let movieQuery = req.query.city;
      let key = process.env.MOVIE_API_KEY;
      // let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=68b1a28c997789649fdcdb75bc8a0a0f&query=amman`;
      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieQuery}`;
      
      if (inMemory[movieQuery] !== undefined) {

        console.log('get the data from the Memory');
        
        res.send(inMemory[movieQuery]);
        
    }
    else{
      axios
          .get(movieUrl)
          .then(result => {
              const movieDataArray = result.data.results.map(ele => {
                  return new Movie(ele);
                
              })
              res.send(movieDataArray);
              console.log(movieDataArray)
    
          })
          .catch(err => {
    
              res.status(500).send(`OPS!! Your City Not Found ${err}`);
          })
    }
}
    class Movie {
          constructor(item) {
              this.title = item.original_title;
              this.overview = item.overview;
              this.average_votes = item.vote_average;
              this.total_votes = item.vote_count;
              this.image_url =  process.env.imgurl+item.poster_path;
              this.popularity = item.popularity;
              this.released_on = item.release_date;
              
          }
        }