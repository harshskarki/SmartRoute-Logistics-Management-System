const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");

router.get("/", (req, res) => {
  res.json({
    message: "Delivery Routes Working",
  });
});

router.post("/", async (req, res) => {
  try {
    const delivery = await Delivery.create(req.body);

    res.status(201).json(delivery);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const deliveries = await Delivery.find();

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(
      req.params.id
    );

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery not found",
      });
    }

    res.json({
      message: "Delivery deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;