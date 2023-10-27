const Sequelize = require("sequelize");
const { env } = require("node:process");

const CONFIG = {
  host: env.L_MYSQL_HOST,
  user: env.L_MYSQL_USERNAME,
  database: env.L_MYSQL_DEFAULT_DATABASE_UDEMY_MAX_NODE,
  password: env.L_MYSQL_PASSWORD,
};

const sequelize = new Sequelize(CONFIG.database, CONFIG.user, CONFIG.password, {
  host: CONFIG.host,
  dialect: "mysql",
});

module.exports = sequelize;
