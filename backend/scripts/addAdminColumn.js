const pool = require('../config/db');

const addAdminColumn = async () => {
    try {
        console.log("🛠️ Adding isAdmin column...");
        await pool.query("ALTER TABLE users ADD COLUMN isAdmin BOOLEAN DEFAULT 0");
        console.log("✅ Column added.");
        process.exit(0);
    } catch (error) {
        if (error.message.includes("duplicate column name")) {
            console.log("⚠️ Column already exists.");
            process.exit(0);
        } else {
            console.error("❌ Error:", error);
            process.exit(1);
        }
    }
};

addAdminColumn();
