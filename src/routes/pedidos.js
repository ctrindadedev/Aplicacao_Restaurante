const express = require("express");
const pedidoController = require("../controllers/pedidoController");
const router = express.Router();
router.get("/", (req, res) => pedidoController.getAllPedidos(req, res));
router.post("/", (req, res) => pedidoController.createPedido(req, res));
module.exports = router;
