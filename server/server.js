const express = require('express')
const cors = require('cors')
const api = require('./routes/api')
const bodyParser = require('body-parser')


const PORT = 3000
const app = express()
app.use(json())
app.use(cors())

app.use('/api', api)

app.get('/', function (req, res) {
  res.send('hello from server')
})

app.listen(PORT, function () {
  console.log(('serve ') + PORT)
})