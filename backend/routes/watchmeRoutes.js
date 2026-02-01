const express = require("express");
const router = express.Router();
const watchMeController = require("../controllers/watchMeController");

router.get("/posts", watchMeController.getPosts);
router.post("/posts/:userId/like", watchMeController.likePost);

module.exports = router;
