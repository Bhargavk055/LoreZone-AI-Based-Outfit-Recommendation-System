const { getAllPosts, createPost } = require("../models/userspostModels.js");
const multer = require("multer");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});

const upload = multer({ storage });

const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};

const addPost = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const postData = { ...req.body, pic_url: `/uploads/${req.file.filename}` };
    const postId = await createPost(postData);

    res.status(201).json({ message: "Post created successfully", postId });
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

module.exports = { getPosts, addPost, upload };
