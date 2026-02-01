const pool = require("../config/db");

const WatchMeModel = {
  getPosts: async () => {
    try {
      const query = "SELECT * FROM posts ORDER BY created_at DESC";
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching posts from DB:", error);
      throw error;
    }
  },

  incrementLike: async (userId) => {
    try {
      // Ensure userId is valid
      if (userId === null || userId === undefined || isNaN(userId)) {
        console.error("Invalid userId:", userId);
        return null;
      }

      // Check if post exists for user
      const checkQuery = "SELECT likes_count FROM posts WHERE user_id = ?";
      const [checkResult] = await pool.query(checkQuery, [userId]);
      
      if (checkResult.length === 0) {
        console.error("Post not found for userId:", userId);
        return null;
      }

      // Update likes_count
      const updateQuery = "UPDATE posts SET likes_count = likes_count + 1 WHERE user_id = ?";
      await pool.query(updateQuery, [userId]);

      // Return the new likes count
      return checkResult[0].likes_count + 1;
    } catch (error) {
      console.error("Database error incrementing like:", error);
      throw error;
    }
  },
};

module.exports = WatchMeModel;
