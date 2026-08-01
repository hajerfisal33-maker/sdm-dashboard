const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "https://sdm-dashboard-pe46.onrender.com",
    user: "root",
    password: "#123Hajerfisal",
    database: "sdm_database",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("MySQL Connected");
        connection.release();
    } catch (err) {
        console.log(err);
    }
})();
ssl: {
  rejectUnauthorized: false
}
module.exports = pool;