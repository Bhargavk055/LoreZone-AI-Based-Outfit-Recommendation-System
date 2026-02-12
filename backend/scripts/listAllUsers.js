const pool = require('../config/db');

const listAllUsers = async () => {
    try {
        console.log("👥 Checking ALL Users...");
        const [rows] = await pool.query("SELECT id, username, email, isAdmin FROM users");
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

listAllUsers();
