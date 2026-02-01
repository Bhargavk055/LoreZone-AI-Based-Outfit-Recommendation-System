const pool = require('../config/db'); // Ensure correct DB connection

const getAllEvents = async () => {
  try {
    const [rows] = await pool.execute("SELECT * FROM dream_big LIMIT 3"); // Use `execute`
    return rows;
  } catch (error) {
    console.error("Database Error:", error.message); // Log error message
    throw error;
  }
};

module.exports = { getAllEvents };
