const pool = require('../config/db');

const checkImages = async () => {
    try {
        const [rows] = await pool.query("SELECT id, trend_type, style_name, style_pic_url FROM trends");
        console.log("📊 Current Trends Data:");
        rows.forEach(row => {
            console.log(`[${row.id}] ${row.trend_type} - ${row.style_name}: ${row.style_pic_url}`);
        });
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

checkImages();
