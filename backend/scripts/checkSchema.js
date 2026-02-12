const pool = require('../config/db');

const checkSchema = async () => {
    try {
        const [rows] = await pool.query("PRAGMA table_info(users);");
        console.log(rows);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkSchema();
