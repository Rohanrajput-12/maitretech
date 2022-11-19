const express = require ('express')
const mongoose = require ('mongoose')
const bodyParser = require('body-parser')

const AuthRoute = require('./routes/auth')


mongoose.connect('mongodb://localhost:27017/testdb', 
{useNewUrlParser:true,
useUnifiedTopology: true,
 }
);
const db = mongoose.connection

db.on('error', (err)=> {
    console.log(err)
})

db.once('open', () => {
     console.log('Database connection')
})

const app  = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT  = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server on listening on port ${PORT}`)
})

app.use('/api', AuthRoute)