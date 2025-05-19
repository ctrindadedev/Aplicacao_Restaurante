const Pedido = require("../models/pedido");
class PedidoController {
  // Método para obter todos os pedidos e renderizar a view
  async getAllPedidos(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      res.render("pedidos/index", { title: "Pedidos", pedidos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  // Método para criar um novo pedido
  async createPedido(req, res) {
    const { cliente, itens, total } = req.body;
    try {
      await Pedido.create({ cliente, itens, total });
      res.redirect("/pedidos");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = new PedidoController();
