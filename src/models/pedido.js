const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Pedido = sequelize.define(
  "Pedido",
  {
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itens: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendente",
    },
  },
  {
    tableName: "pedidos",
  }
);

Pedido.beforeCreate((pedido) => {
  if (pedido.total < 0) {
    throw new Error("Total do pedido não pode ser negativo.");
  }
});

module.exports = Pedido;
