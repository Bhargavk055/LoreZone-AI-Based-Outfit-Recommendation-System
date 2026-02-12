const Brand = require('../models/brandModel');

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.getAllBrands();
        res.json(brands);
    } catch (err) {
        console.error("Error fetching brands:", err);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { getBrands };
