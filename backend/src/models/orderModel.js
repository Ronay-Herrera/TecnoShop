const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String},
  productName: { type: String},
  productQuantity: { type: Number}
});

const orderSchema = new mongoose.Schema({
  id: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  orderId: { type: String },
  products: [productSchema],
  quantity: { type: Number },
  userId: {  type : String },
  date: { type: Date, default: Date.now },
  state: { type: String }
}, {collection: 'Orders'});

const orderModel = mongoose.model('Orders', orderSchema);


module.exports = orderModel;
