const pool = require('../config/db');

const getAllBrands = async () => {
  try {
    const [rows] = await pool.execute("SELECT * FROM brands");
    return rows;
  } catch (error) {
    console.error("Database Error:", error.message);
    throw error;
  }
};

module.exports = { getAllBrands };
