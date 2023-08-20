var mongoose = require('mongoose');
var ProductSchema = mongoose.Schema({
    name: String,
    price: String,
    picture: String
});

const ProductModel = mongoose.model('toy', ProductSchema, 'product');
module.exports = ProductModel;