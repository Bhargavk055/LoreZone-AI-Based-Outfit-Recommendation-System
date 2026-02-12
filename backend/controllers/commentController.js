const pool = require('../config/db');

const addComment = async (req, res) => {
    try {
        const { post_id, username, comment_text } = req.body;
        if (!post_id || !comment_text) {
            return res.status(400).json({ error: "Post ID and Comment are required" });
        }

        const query = "INSERT INTO comments (post_id, username, comment_text) VALUES (?, ?, ?)";
        await pool.execute(query, [post_id, username || 'Anonymous', comment_text]);

        res.json({ message: "Comment added successfully", username, comment_text });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};

const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const query = "SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC";
        const [comments] = await pool.execute(query, [postId]);

        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};

module.exports = { addComment, getComments };
