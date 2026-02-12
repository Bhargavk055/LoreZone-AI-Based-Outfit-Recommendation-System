const pool = require('../config/db');

async function checkUser() {
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = 'rmbrothers@gmail.com'");
        console.log("User Data:", rows[0]);
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

checkUser();
