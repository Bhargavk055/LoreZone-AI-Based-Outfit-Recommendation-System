const pool = require('../config/db');

const makeAdmin = async () => {
    try {
        console.log("👑 Making bharath@gmail.com an Admin...");
        await pool.query("UPDATE users SET isAdmin = 1 WHERE email = 'bharath@gmail.com'");
        console.log("✅ User updated to Admin.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

makeAdmin();
