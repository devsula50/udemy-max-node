const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Product = require("./product");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Cart;
