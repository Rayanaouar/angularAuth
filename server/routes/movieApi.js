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
  res.send('From API route')
})

router.get('/popular',(req, res) => {
  Movie.find({},)

})

module.exports = router
