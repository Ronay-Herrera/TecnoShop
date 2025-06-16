const express = require("express");
const axios = require("axios");
const productControllers = require("../controllers/productsController");
const router = express.Router();



router.get("/", productControllers.getProducts);

router.get("/:id", productControllers.getProductsbyId)

router.post("/", productControllers.createProduct);

router.put("/:id", productControllers.putProducts);

module.exports = router;
