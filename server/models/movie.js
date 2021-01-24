const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
  type:String,
  backdrop_path: String,
  genre: String,
  overview: String,
  poster_path: String,
  release_date: String,
  title: String,
  vote_average: Number,
  running_time: String,
  country: String,
})
module.exports = mongoose.model('movie', userSchema,'movies')