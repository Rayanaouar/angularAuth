const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
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

router.post('/register', (req, res) => {
  let userData = req.body
  console.log(req.body);
  let user = new User(userData)
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        console.log('Email already exist');
        res.status(401).send('Email already exist')
      } else {
        user.save((error, registeredUser) => {
          if (error) {
            console.log(error);
          } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({ token })
          }
        })
      }
    }
  })

})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        console.log('Invalid email');
        res.status(401).send('Invalid email')
      } else {
        if (user.password !== userData.password) {
          console.log('Invalid password');
          res.status(401).send('Invalid password')
        }
        else {
          console.log('valid');
          let payload = { subject: user._id }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({ token })
        }
      }
    }
  })
})

module.exports = router