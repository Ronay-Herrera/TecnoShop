const productModel = require('../models/productModel');



exports.createProduct = async (req, res) => {
  try {
    const product = new productModel(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductsbyId = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const products = await productModel.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.putProducts = async (req,res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, image } = req.body;
    const product = await productModel.findByIdAndUpdate(
      id,
      { name, price, stock, image },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}