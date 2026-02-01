const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/top-liked-posts", postController.getTopLikedPosts);

module.exports = router;
