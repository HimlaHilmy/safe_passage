
import mongoose from "mongoose";

const assistanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name."],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number."],
      trim: true,
    },
    assistanceType: {
      type: String,
      required: [true, "Please select an assistance type."],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Please enter your location."],
      trim: true,
    },
    details: {
      type: String,
      required: [true, "Please enter additional details."],
      trim: true,
    },
    requestId: {
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
  { timestamps: true }
);

const Assistance = mongoose.model(
  "Assistance",
  assistanceSchema
);

export default Assistance;
