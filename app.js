const express = require('express')
const bodyParser = require('body-parser')
const app = express()
            
const postRoute = require("./Routes/post")
const userRoute = require("./Routes/user")
const imageRoute = require("./Routes/image")
const commentRoutes = require('./Routes/comment');

app.use(bodyParser.json())
app.use('/uploads',express.static('upload'))


app.use('/post',postRoute)
app.use('/user',userRoute)
app.use('/images',imageRoute)
app.use('/api', commentRoutes); 
module.exports = app