const pool = require('../config/db');

async function checkGuuchi() {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = 'guuchi@gmail.com'");
        console.log("Guuchi Data:", rows[0]);
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkGuuchi();
