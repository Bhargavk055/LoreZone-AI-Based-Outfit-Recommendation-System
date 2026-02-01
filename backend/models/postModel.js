const db = require("../config/db");

class Post {
  static async getTopLikedPosts(filters) {
    const { skin_tone, height, gender, body_type, occasion, theme } = filters;

    const query = `
      SELECT * FROM posts 
      WHERE (? IS NULL OR skin_tone = ?) 
      AND (? IS NULL OR height = ?) 
      AND (? IS NULL OR gender = ?) 
      AND (? IS NULL OR body_type = ?) 
      AND (? IS NULL OR occasion = ?) 
      AND (? IS NULL OR theme = ?)
      ORDER BY likes_count DESC
      LIMIT 10
    `;

    try {
      const [rows] = await db.execute(query, [
        skin_tone, skin_tone,
        height, height,
        gender, gender,
        body_type, body_type,
        occasion, occasion,
        theme, theme,
      ]);
      return rows; // Return all matching posts
    } catch (error) {
      console.error("Database error:", error);
      throw error;
    }
  }
}

module.exports = Post;
