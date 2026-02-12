const pool = require('../config/db');

const checkUser = async () => {
    try {
        const [rows] = await pool.query("SELECT id, username, email, isAdmin FROM users WHERE email = 'bharath@gmail.com'");
        console.log(rows);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkUser();
