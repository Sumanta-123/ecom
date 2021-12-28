const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const  mongoose = require('mongoose')

//Bring the constant to the app
const { DB, PORT, SECRET } = require('./config')
const { jwt } = require('jsonwebtoken')
const e = require('express')

//Initialize the app
const app = express()
//User router middleware
app.use('/api/users', require('./routes/users'))
//Connect to DB
mongoose.connect(DB, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err) throw err;
    console.log('Connect Mongo DB')
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})