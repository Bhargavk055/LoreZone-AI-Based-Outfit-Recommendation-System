const express = require("express");
const cors = require("cors");
require("dotenv").config();

const trendRoutes = require("./routes/trendRoutes");
const eventRoutes = require("./routes/eventRoutes");
const dreamBigRoutes = require("./routes/dreamBigRoutes");
const postRoutes = require("./routes/postRoutes");
const brandRoutes = require("./routes/brandRoutes");
const watchmeRoutes = require("./routes/watchmeRoutes");

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

// Register Routes
app.use("/api/trend", trendRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/dream", dreamBigRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/watchme", watchmeRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

