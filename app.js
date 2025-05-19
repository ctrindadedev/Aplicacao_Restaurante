const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const pedidosRouter = require("./src/routes/pedidos");
const app = express();
const port = 3000;
const Pedido = require("./src/models/pedido");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", "src/views");

// Definindo diretório para arquivos estáticos
app.use(express.static("src/public"));

// Usando as rotas de pedidos
app.use("/pedidos", pedidosRouter);
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    app.listen(port, () => {
      console.log(`Servidor rodando em <http://localhost>:${port}`);
    });
  })
  .catch((err) => console.error("Erro ao sincronizar banco de dados:", err));

// Rota inicial que busca os pedidos e envia para a view
app.get("/", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll(); // busca no banco
    res.render("pedidos/index", { pedidos }); // envia os pedidos para a view
  } catch (err) {
    console.error("Erro ao buscar pedidos:", err);
    res.status(500).send("Erro ao carregar pedidos");
  }
});

// app.post("/pedidos", async (req, res) => {
//   try {
//     const { cliente, itens, total } = req.body;

//     //Limpar o texto
//     const itensLimpos = itens.trim();

//     await Pedido.create({
//       cliente,
//       itens: itensLimpos,
//       total,
//     });

//     res.redirect("/");
//   } catch (err) {
//     console.error("Erro ao criar pedido:", err);
//     res.status(500).send("Erro ao criar pedido");
//   }
// });
