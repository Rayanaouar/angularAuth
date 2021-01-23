const express = require('express')
const cors = require('cors')
const api = require('./routes/authApi')
const movie = require('./routes/movieApi')

const bodyParser = require('body-parser')


const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/auth', api)
app.use('/movie',movie)

app.get('/movieclub', function (req, res) {
  res.send('hello from server')
})

app.listen(PORT, function () {
  console.log(('serve ') + PORT)
})