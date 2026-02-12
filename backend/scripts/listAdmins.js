const pool = require('../config/db');

const listAdmins = async () => {
    try {
        console.log("🛡️ Checking Admin Users...");
        const [rows] = await pool.query("SELECT id, username, email, isAdmin FROM users WHERE isAdmin = 1");
        if (rows.length === 0) {
            console.log("❌ No Admin users found!");
        } else {
            console.log("✅ Found Admins:");
            console.table(rows);
        }
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

listAdmins();
