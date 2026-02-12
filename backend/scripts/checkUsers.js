const pool = require("../config/db");

const checkUsers = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        console.log("Registered Users:", rows);
    } catch (error) {
        console.error("Error:", error);
    }
};

checkUsers();
