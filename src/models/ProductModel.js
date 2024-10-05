
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image: [String],
    category: String,
    price: Number,
    description: String,
    measurement: String,
    ownerEmail: String,
    quantity: Number,

});

module.exports = mongoose.model('products', productSchema);
