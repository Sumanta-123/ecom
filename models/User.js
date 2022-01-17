const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true,
        default: "user",
        enum:["user", "retailer", "admin"]
    },
    password:{
        type: String,
        required: true,
        // length: 6
    },
    cart: {
        type: Array,
        default: []
    }

},{timestamps: true})

module.exports = model('users', userSchema);