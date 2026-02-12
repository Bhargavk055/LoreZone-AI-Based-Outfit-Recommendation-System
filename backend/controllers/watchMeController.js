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

const createPost = async (req, res) => {
  try {
    console.log("Received upload request:", req.body);
    console.log("File:", req.file);

    const { user_id, caption } = req.body;
    const file = req.file;

    if (!file) {
      console.error("Upload failed: No file received");
      return res.status(400).json({ message: "File is required (Image or Video)" });
    }

    // Auto-detect media type
    const mimeType = file.mimetype;
    let mediaType = 'image';
    if (mimeType.startsWith('video/')) {
      mediaType = 'video';
    }

    // Construct URL
    const pic_url = `/images/${file.filename}`; // Served statically

    await WatchMeModel.createPost({
      user_id, // This is expected to be the username for now
      pic_url,
      media_type: mediaType,
      caption
    });

    res.status(201).json({ message: "Post uploaded successfully!" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getPosts, likePost, createPost };
