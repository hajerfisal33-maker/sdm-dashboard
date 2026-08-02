const mysql = require("mysql2/promise");
require("dotenv").config();
console.log(process.env.DB_HOST);
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql-sdm-hajerfisal33-e293.h.aivencloud.com",
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 21826,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Connected Successfully!");
    connection.release();
  } catch (err) {
    console.error("Database Connection Error:", err);
  }
})();

module.exports = pool;