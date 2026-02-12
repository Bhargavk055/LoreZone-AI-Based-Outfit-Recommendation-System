const pool = require('../config/db');

const diagnoseTrends = async () => {
    try {
        const [types] = await pool.query("SELECT DISTINCT trend_type FROM trends");
        console.log("TYPES:", types.map(t => t.trend_type));

        const [rows] = await pool.query("SELECT id, trend_type, style_pic_url FROM trends");
        console.log("ROWS:");
        rows.forEach(row => {
            // Log minimal info to avoid truncation
            console.log(`[${row.id}] ${row.trend_type} -> ${row.style_pic_url ? 'HAS_URL' : 'NULL'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

diagnoseTrends();
