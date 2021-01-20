import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'

const PORT = 3000
import api from './routes/api'
const app = express()
app.use(json())
app.use(cors())

app.use('/api',api)

app.get('/',function(req,res){
  res.send('hello from server')
})

app.listen(PORT,function(){
  console.log(('serve ')+PORT)
})