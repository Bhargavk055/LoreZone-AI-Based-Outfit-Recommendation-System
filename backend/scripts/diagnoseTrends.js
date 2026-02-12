const pool = require('../config/db');

const diagnoseTrends = async () => {
    try {
        console.log("🔍 Diagnosing Trends Data...");

        // Get all unique trend types
        const [types] = await pool.query("SELECT DISTINCT trend_type FROM trends");
        console.log("📁 Existing Trend Types in DB:", types.map(t => t.trend_type));

        // Get all rows to check images
        const [rows] = await pool.query("SELECT id, trend_type, style_name, style_pic_url FROM trends");
        console.log("\n📋 All Trend Entries:");
        rows.forEach(row => {
            console.log(`[ID: ${row.id}] Type: '${row.trend_type}' | Name: '${row.style_name}' | Image: ${row.style_pic_url ? row.style_pic_url.substring(0, 50) + '...' : 'NULL'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

diagnoseTrends();
