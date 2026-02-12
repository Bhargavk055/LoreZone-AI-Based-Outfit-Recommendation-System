const pool = require("../config/db");

class User {
    // Register a new user
    static async create(user) {
        const { username, email, password, isAdmin, subscription_plan, is_verified } = user;
        const query = `INSERT INTO users (username, email, password, isAdmin, subscription_plan, is_verified) VALUES (?, ?, ?, ?, ?, ?)`;
        // Default isAdmin to false (0) if not provided
        const adminValue = isAdmin ? 1 : 0;
        const planValue = subscription_plan || 'STARTER';
        const verifiedValue = is_verified ? 1 : 0;

        const [result] = await pool.execute(query, [username, email, password, adminValue, planValue, verifiedValue]);
        return result.insertId;
    }

    // Find by flexible identifier (Email OR Username)
    static async findByIdentifier(identifier) {
        const query = `SELECT * FROM users WHERE email = ? OR username = ?`;
        const [rows] = await pool.execute(query, [identifier, identifier]);
        return rows[0];
    }

    // Find by ID
    static async findById(id) {
        const query = `SELECT * FROM users WHERE id = ?`;
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    // Update Subscription Plan
    static async updateSubscription(id, plan) {
        const query = `UPDATE users SET subscription_plan = ?, is_verified = 1 WHERE id = ?`;
        const [result] = await pool.execute(query, [plan, id]);
        return result.affectedRows > 0;
    }
}

module.exports = User;
