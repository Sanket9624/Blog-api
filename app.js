const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors());

const postRoute = require("./Routes/post")
const userRoute = require("./Routes/user")
const imageRoute = require("./Routes/image")
const commentRoutes = require('./Routes/comment');

app.use(bodyParser.json())
app.use('/uploads',express.static('upload'))


app.use('/post',postRoute)
app.use('/user',userRoute)
app.use('/images',imageRoute)
app.use('/api', commentRoutes) 


const port = process.env.PORT
app.listen(port,()=>{
            console.log(`Port is running on http://localhost:${port}`);
})
