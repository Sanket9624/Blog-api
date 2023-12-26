const app = require('./app')

const port = 3000

app.listen(port,()=>{
            console.log(`Port is running on http://localhost:${port}`);
})