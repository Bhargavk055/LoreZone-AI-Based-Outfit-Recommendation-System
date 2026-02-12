const Post = require("../models/postModel");

exports.getTopLikedPosts = async (req, res) => {
  try {
    const filters = req.query; // Get filters from the request query
    const posts = await Post.getTopLikedPosts(filters);
    console.log(filters);
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching top liked posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
