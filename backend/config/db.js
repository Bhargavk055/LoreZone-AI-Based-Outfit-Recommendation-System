require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // AWS RDS Endpoint
  user: process.env.DB_USER,     // Your DB Username
  password: process.env.DB_PASS, // Your DB Password
  database: process.env.DB_NAME, // Your Database Name
  port: 3306,                    // MySQL default port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert to async/await
const db = pool.promise();

module.exports = db;
