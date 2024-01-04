const cors = require('cors')
const app = require('./app')


app.use(cors());

app.options('*', cors());

// ... Other middleware and route configurations


const port = 3000
app.listen(port,()=>{
            console.log(`Port is running on http://localhost:${port}`);
})