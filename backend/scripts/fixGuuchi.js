const pool = require('../config/db');

async function fixGuuchi() {
    try {
        await pool.query("UPDATE users SET subscription_plan = 'PROFESSIONAL', is_verified = 1 WHERE email = 'guuchi@gmail.com'");
        console.log("Guuchi updated to PROFESSIONAL");
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixGuuchi();
