const User = require("../models/userModel");
const pool = require("../config/db"); // Direct DB access for stats

const getStats = async (req, res) => {
    try {
        // Count users
        const [userRows] = await pool.query("SELECT COUNT(*) as count FROM users");
        const userCount = userRows[0].count;

        // Count posts
        const [postRows] = await pool.query("SELECT COUNT(*) as count FROM posts");
        const postCount = postRows[0].count;

        // Count trends
        const [trendRows] = await pool.query("SELECT COUNT(*) as count FROM trends");
        const trendCount = trendRows[0].count;

        res.json({
            users: userCount,
            posts: postCount,
            trends: trendCount
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT id, username, email, isAdmin, created_at FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await pool.query("DELETE FROM users WHERE id = ?", [userId]);
        res.json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getStats,
    getUsers,
    deleteUser
};
