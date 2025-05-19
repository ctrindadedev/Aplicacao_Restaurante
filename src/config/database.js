


const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao MySQL com sucesso!");
    return sequelize.sync();
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao MySQL:", err);
  });

module.exports = sequelize;
