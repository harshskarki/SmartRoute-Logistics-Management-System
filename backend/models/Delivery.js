const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    packageWeight: {
      type: Number,
      required: true,
    },

    assignedVehicle: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Transit",
        "Delivered",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Delivery",
  deliverySchema
);