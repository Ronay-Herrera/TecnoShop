const express = require("express");
const axios = require("axios");
const orderControllers = require("../controllers/ordersController");
const router = express.Router();

/*
const JSON_SERVER_URL = "http://localhost:3000/orders";
*/

// Obtener todas las órdenes
router.get("/", orderControllers.getOrders);

// Obtener una orden por ID
router.get("/:id", orderControllers.getOrdersByUserId);

// Crear una nueva orden
router.post("/", orderControllers.createOrder);

// Eliminar una orden por ID
router.delete("/:id", orderControllers.deleteOrder);

module.exports = router;
