const pool = require('../config/db');

async function upgradeUser() {
    try {
        await pool.query("UPDATE users SET subscription_plan = 'PROFESSIONAL', is_verified = 1 WHERE email = 'rmbrothers@gmail.com'");
        console.log("User updated to PROFESSIONAL");
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

upgradeUser();
