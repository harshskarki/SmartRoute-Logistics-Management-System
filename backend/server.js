const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Vehicle = require("./models/Vehicle");
const Delivery = require("./models/Delivery");
const vehicleRoutes = require("./routes/vehicleRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
console.log("Vehicle Model Loaded:", Vehicle.modelName);
console.log("Delivery Model Loaded:", Delivery.modelName);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/deliveries", deliveryRoutes);

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