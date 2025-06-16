const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number},
  stock: { type: Number},
  image: { type: String}
}, {collection: 'Products'});

const productModel = mongoose.model('Products', productSchema);


module.exports = productModel;
