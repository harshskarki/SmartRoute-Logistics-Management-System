const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚚 SmartRoute Backend Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "running",
    service: "SmartRoute Backend",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 SmartRoute Server running on port ${PORT}`
  );
});