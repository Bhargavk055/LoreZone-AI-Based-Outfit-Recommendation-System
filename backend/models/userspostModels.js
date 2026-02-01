const db = require("../config/db.js");

const getAllPosts = async () => {
  const [rows] = await db.execute("SELECT * FROM posts ORDER BY post_id DESC");
  return rows;
};

const createPost = async (postData) => {
  const {
    user_id,
    pic_url, // Now storing file path
    skin_tone,
    height,
    gender,
    body_type,
    occasion,
    theme,
    price,
    post_description,
  } = postData;

  const query = `
    INSERT INTO posts (user_id, pic_url, skin_tone, height, gender, body_type, occasion, theme, price, post_description) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [user_id, pic_url, skin_tone, height, gender, body_type, occasion, theme, price, post_description];

  const [result] = await db.execute(query, values);
  return result.insertId;
};

module.exports = { getAllPosts, createPost };
