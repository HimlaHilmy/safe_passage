
import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyType: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: [
        "Reported",
        "Under Review",
        "Assistance in Progress",
        "Resolved",
      ],
      default: "Reported",
    },
  },
  {
    timestamps: true,
  }
);

const Emergency = mongoose.model("Emergency", emergencySchema);

export default Emergency;
