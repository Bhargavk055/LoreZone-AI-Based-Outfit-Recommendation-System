const db = require('../config/db'); // Import MySQL connection

class Trend {
  constructor(id, trend_type, style_name, description, style_pic_url) {
    this.id = id;
    this.trend_type = trend_type;
    this.style_name = style_name;
    this.description = description;
    this.style_pic_url = style_pic_url;
  }
}

const getTrends = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trends'); // Fetch trends from DB
    res.json(rows);
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getTrends, Trend }; // Export both
