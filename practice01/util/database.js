const mysql = require("mysql2");
const { env } = require("node:process");

const config = {
  host: env.L_MYSQL_HOST,
  user: env.L_MYSQL_USERNAME,
  database: env.L_MYSQL_DEFAULT_DATABASE_UDEMY_MAX_NODE,
  password: env.L_MYSQL_PASSWORD,
};

const pool = mysql.createPool({
  ...config,
});

module.exports = pool.promise();
