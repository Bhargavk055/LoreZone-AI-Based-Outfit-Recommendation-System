const express = require("express");
const cors = require("cors");
require("dotenv").config();

const trendRoutes = require("./routes/trendRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dreamBigRoutes = require("./routes/dreamBigRoutes");
const postRoutes = require("./routes/postRoutes");
const brandRoutes = require("./routes/brandRoutes");
const watchmeRoutes = require("./routes/watchmeRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://astonishing-travesseiro-449987.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('public/images'));

// Register Routes
app.use("/api/trend", trendRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/dream", dreamBigRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/watchme", watchmeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.use("/api/comments", commentRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

