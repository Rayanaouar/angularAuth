const express = require('express')
const cors = require('cors')
const authApi = require('./routes/authApi')
const movieApi = require('./routes/movieApi')

const bodyParser = require('body-parser')


const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authApi)
app.use('/movie',movieApi)

app.get('/', function (req, res) {
  res.send('hello from server')
})

app.listen(PORT, function () {
  console.log(('serve ') + PORT)
})