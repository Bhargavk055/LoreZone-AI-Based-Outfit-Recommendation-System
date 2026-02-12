const pool = require("../config/db");

const WatchMeModel = {
  getPosts: async (viewerId = null) => {
    try {
      // Fetch posts with user privacy logic
      // If post user is private, only show if viewerId == post.user_id (simplest logic for now)
      // Since user_id is currently TEXT (username), we join on username
      const query = `
        SELECT p.*, u.is_private, u.username 
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.username
        ORDER BY p.created_at DESC
      `;
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching posts from DB:", error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const { user_id, pic_url, media_type, caption } = postData;
      const query = `
        INSERT INTO posts (user_id, pic_url, media_type, post_description, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      const [result] = await pool.query(query, [user_id, pic_url, media_type || 'image', caption]);
      return result.insertId;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  incrementLike: async (postId) => {
    try {
      // Ensure postId is valid
      if (!postId) return null;

      // Check if post exists
      const checkQuery = "SELECT likes_count FROM posts WHERE post_id = ?";
      const [checkResult] = await pool.query(checkQuery, [postId]);

      if (checkResult.length === 0) return null;

      // Update likes_count
      const updateQuery = "UPDATE posts SET likes_count = likes_count + 1 WHERE post_id = ?";
      await pool.query(updateQuery, [postId]);

      // Return the new likes count
      return checkResult[0].likes_count + 1;
    } catch (error) {
      console.error("Database error incrementing like:", error);
      throw error;
    }
  },
};

module.exports = WatchMeModel;
