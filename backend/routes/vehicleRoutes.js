const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

router.get("/", (req, res) => {
  res.json({
    message: "Vehicle Routes Working",
  });
});

router.post("/", async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;

router.get("/all", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});