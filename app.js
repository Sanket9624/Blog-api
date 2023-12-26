const express = require('express')
const bodyParser = require('body-parser')
const app = express()
            
const postRoute = require("./Routes/post")
const userRoute = require("./Routes/user")
const imageRoute = require("./Routes/image")

app.use(bodyParser.json())
app.use('/uploads',express.static('upload'))


app.use('/post',postRoute)
app.use('/user',userRoute)
app.use('/images',imageRoute)
module.exports = app