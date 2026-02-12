const pool = require('../config/db');

const checkColumns = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM users LIMIT 1");
        if (rows.length > 0) {
            console.log("Columns:", Object.keys(rows[0]));
            console.log("Sample Row:", rows[0]);
        } else {
            console.log("No users found.");
        }
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkColumns();
