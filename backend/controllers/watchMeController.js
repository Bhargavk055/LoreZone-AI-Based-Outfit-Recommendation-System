const WatchMeModel = require("../models/watchMeModel");

const getPosts = async (req, res) => {
  try {
    const posts = await WatchMeModel.getPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const likePost = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const newLikesCount = await WatchMeModel.incrementLike(userId);
    if (newLikesCount === null) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ likes_count: newLikesCount });
  } catch (error) {
    console.error("Error updating like:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getPosts, likePost };
