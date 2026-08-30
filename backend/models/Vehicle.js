const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
    },

    vehicleType: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Available", "On Delivery", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);