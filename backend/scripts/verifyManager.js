const pool = require('../config/db');

const verifyManager = async () => {
    try {
        console.log("🔍 Verifying 'manager@lorezone.admin'...");
        const [rows] = await pool.query("SELECT id, username, email, isAdmin FROM users WHERE email = 'manager@lorezone.admin'");
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyManager();
