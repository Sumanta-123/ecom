const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const passport = require('passport')
// const { MongoClient } = require('mongodb');
//Bring the constant to the app
const { DB, PORT, SECRET } = require('./config')
const { jwt } = require('jsonwebtoken')
// const e = require('express')

//Initialize the app
const app = express()
app.use(cors())
app.use(passport.initialize())
require('./middlewares/passport')(passport)
//Body parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
//User router middleware
app.use('/api/users', require('./routes/users'))
// Connect to DB
mongoose.connect(DB, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err=>{
    if(err) throw err;
    console.log('Connect Mongo DB')
})

// const client = new MongoClient(DB, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   if (err) throw err;
//   // const collection = client.db('ecom_db').collection('users')
//     //   const collection = client.db("ecom_db")
//   // perform actions on the collection object
//     // console.log(collection)
//     // const user = collection.findOne()
//     // console.log(collection)
//     console.log('Connected mongo db')
//   client.close();
// });


app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})