const express = require("express");
const router = express.Router();
const watchMeController = require("../controllers/watchMeController");
const multer = require("multer");
const path = require("path");

const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../public/images");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use absolute path
    },
    filename: (req, file, cb) => {
        cb(null, "watchme_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get("/posts", watchMeController.getPosts);
router.post("/posts/:userId/like", watchMeController.likePost);
router.post("/upload", upload.single("file"), watchMeController.createPost);

module.exports = router;
