require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

mongoose.connect(process.env.mongoDB)
const db = mongoose.connection
db.on('error', (error)=>{
    console.log(error)
})

db.on('open', ()=>{
    console.log("Connected to db")
})

const reqIdentifier = (req,res,next) => {
    console.log("Got/Sent a req/res")
    next()
}

const newUrl = require('./routes/newUrl')


// Middlewear
app.use(reqIdentifier)
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine', 'ejs')

app.use('/new', newUrl)

app.get('/', (req,res,next)=>{
    res.send("Connection success")
})



app.listen(process.env.port, ()=> {
    console.log(`Listening for connections on port ${process.env.port}`)
})