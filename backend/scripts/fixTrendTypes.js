const pool = require('../config/db');

const fixTrendTypes = async () => {
    try {
        console.log("🏷️ Fixing Trend Categories...");

        // Update ID 1 to be 'Clothing Trends'
        await pool.query("UPDATE trends SET trend_type = 'Clothing Trends', style_name = 'Y2K Fashion', description = 'The return of 2000s aesthetics.' WHERE id = 1");
        console.log("✅ ID 1 -> Clothing Trends");

        // Update ID 3 to be 'Industry News'
        await pool.query("UPDATE trends SET trend_type = 'Industry News', style_name = 'Eco-Friendly Shift', description = 'Major brands moving to sustainable materials.' WHERE id = 3");
        console.log("✅ ID 3 -> Industry News");

        // Update ID 2 to 'Clothing Trends' as well for variety
        await pool.query("UPDATE trends SET trend_type = 'Clothing Trends' WHERE id = 2");
        console.log("✅ ID 2 -> Clothing Trends");

        console.log("🎉 Categories fixed! 'Clothing Trends' and 'Industry News' filters will now work.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error fixing types:", error);
        process.exit(1);
    }
};

fixTrendTypes();
