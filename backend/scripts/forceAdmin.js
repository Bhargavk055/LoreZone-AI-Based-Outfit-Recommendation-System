const pool = require('../config/db');

const forceAdmin = async () => {
    try {
        console.log("⚡ Forcing Admin Access for 'gnan chand'...");

        // Update by username to be sure
        await pool.query("UPDATE users SET isAdmin = 1 WHERE username = 'gnan chand'");

        // Also update by email if possible (assuming from screenshot context)
        // The screenshot showed "bharath@gmail.com" under "gnan chand"
        await pool.query("UPDATE users SET isAdmin = 1 WHERE email = 'bharath@gmail.com'");

        console.log("✅ User 'gnan chand' / 'bharath@gmail.com' is now an Admin.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

forceAdmin();
