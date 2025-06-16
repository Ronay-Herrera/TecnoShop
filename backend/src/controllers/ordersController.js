const orderModel = require('../models/orderModel');



exports.createOrder = async (req, res) => {
  try {
    const order = new orderModel(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    const ordersWithId = orders.map(orders => ({
      ...orders.toObject(),
      id: orders._id // Map _id to id
  }));
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await orderModel.find({ userId: id });
    if (!orders || orders.length === 0) {
      return res.status(404).send({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
}