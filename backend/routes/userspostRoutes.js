const express = require("express");
const { getPosts, addPost, upload } = require("../controllers/userspostController.js");

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", upload.single("pic_file"), addPost); // Ensure correct file field name

module.exports = router;
