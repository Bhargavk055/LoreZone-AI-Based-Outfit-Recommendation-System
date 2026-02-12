const pool = require("../config/db");

const getSystemStats = async (req, res) => {
    try {
        // Run queries in parallel for efficiency
        const [userRows] = await pool.query("SELECT COUNT(*) as count FROM users");
        const [postRows] = await pool.query("SELECT COUNT(*) as count FROM posts");
        const [eventRows] = await pool.query("SELECT COUNT(*) as count FROM events");
        const [brandRows] = await pool.query("SELECT COUNT(*) as count FROM brands");

        const stats = {
            totalUsers: userRows[0].count,
            totalPosts: postRows[0].count,
            totalEvents: eventRows[0].count,
            totalBrands: brandRows[0].count,
        };

        res.json(stats);
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT id, username, email, subscription_plan, is_verified, isAdmin FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getAllTrends = async (req, res) => {
    try {
        const [trends] = await pool.query("SELECT * FROM trends ORDER BY id DESC");
        res.json(trends);
    } catch (error) {
        console.error("Error fetching trends:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteTrend = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM trends WHERE id = ?", [id]);
        res.json({ message: "Trend deleted successfully" });
    } catch (error) {
        console.error("Error deleting trend:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        // Also delete their trends? For now, we keep it simple.
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("UPDATE users SET is_verified = 1 WHERE id = ?", [id]);
        res.json({ message: "User verified successfully" });
    } catch (error) {
        console.error("Error verifying user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getSystemStats, getAllUsers, getAllTrends, deleteTrend, deleteUser, verifyUser };
