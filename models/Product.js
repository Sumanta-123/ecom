const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },      
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    // shop_id: {
    //     type: String,
    //     required: true
    // }
    
},{timestamps: true})


module.exports = model('products', productSchema)