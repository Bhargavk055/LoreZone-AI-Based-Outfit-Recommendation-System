const express = require("express");
const { getSystemStats, getAllUsers, getAllTrends, deleteTrend, deleteUser, verifyUser } = require("../controllers/adminController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

// GET /api/admin/stats
router.get("/stats", getSystemStats);
router.get("/users", protect, admin, getAllUsers);
router.get("/trends", protect, admin, getAllTrends);

// ACTIONS
router.delete("/trends/:id", protect, admin, deleteTrend);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id/verify", protect, admin, verifyUser);

module.exports = router;
