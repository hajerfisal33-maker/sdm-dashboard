const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql-3d712fae-sdm-dashboard.f.aivencloud.com",
  user: process.env.DB_USER || "avnadmin",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "defaultdb",
  port: process.env.DB_PORT || 10641,
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