const db = require('../config/db'); // Import MySQL connection

class Trend {
  constructor(id, trend_type, style_name, description, style_pic_url, user_id, brand_name) {
    this.id = id;
    this.trend_type = trend_type;
    this.style_name = style_name;
    this.description = description;
    this.style_pic_url = style_pic_url;
    this.user_id = user_id;
    this.brand_name = brand_name;
  }
}

const getTrends = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trends ORDER BY id DESC'); // Fetch trends from DB
    res.json(rows);
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createTrend = async (req, res) => {
  try {
    const { trend_type, style_name, description } = req.body;
    let style_pic_url = req.body.style_pic_url;

    if (req.file) {
      style_pic_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const user_id = req.user.id;
    const brand_name = req.user.username; // Assuming username is the brand name

    if (!trend_type || !style_name || !description || !style_pic_url) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = `INSERT INTO trends (trend_type, style_name, description, style_pic_url, user_id, brand_name) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.query(query, [trend_type, style_name, description, style_pic_url, user_id, brand_name]);

    res.status(201).json({ message: "Trend uploaded successfully" });
  } catch (error) {
    console.error('Error creating trend:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getTrends, createTrend, Trend };
