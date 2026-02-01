const pool = require('../config/db'); 

const getAllEvents = async () => {
  try {
    const [rows] = await pool.execute("SELECT * FROM brands"); 
    return rows;
  } catch (error) {
    console.error("Database Error:", error.message); 
    throw error;
  }
};

module.exports = { getAllEvents };
