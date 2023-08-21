var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
    id: String,
    name: String,
    price: String,
    picture: String
});

const ProductModel = mongoose.model('product', ProductSchema, 'product');
module.exports = ProductModel;