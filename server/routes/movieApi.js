const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Movie = require('../models/movie')
const db = "mongodb+srv://admin:123456789raya@gettingstarted.ezkjr.mongodb.net/movieClub?retryWrites=true&w=majority"

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(db, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

router.get('/', (req, res) => {
  res.send('From API route movie')
})

router.delete('/remove/:id',(req,res)=>{
  req.params.id = "600d5eb87d0e234b7b956903"
  Movie.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
})
})

router.put('/update/:id', (req, res, next) => {
  let movieToUpdate = new Movie(req.body)
  Movie.updateOne({_id: req.params.id}, movieToUpdate).then(
    () => {
      res.status(200).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.post('/add',(req,res)=>{
  let movieData = req.body
  let movieToRegister = new Movie(movieData)
  movieToRegister.save((error, registeredMovie) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "ok" })
    }
  })
})


router.get('/popular',(req, res) => {
  var movieMap = {};
  Movie.find({type: "popular"}, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);  
    }
  });

})

router.get('/toprated',(req, res) => {
  var movieMap = {};
  Movie.find({type: "toprated"}, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);  
  }
  });

})
router.get('/upcoming',(req, res) => {
  var movieMap = {};
  Movie.find({type: "upcoming"}, (err, movies) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(movies);  
  }
  });

})
router.get('/details/:id', (req, res) => {
  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      console.log(err);
    } else {
      if (!movie) {
        res.status(401).send('movie not found')
      } else {
          res.status(200).send(movie)
        }
      }
    }
  )
})

module.exports = router
