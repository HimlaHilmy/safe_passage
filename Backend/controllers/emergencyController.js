
import Emergency from "../models/emergencyModel.js";

// Create a new emergency report
const createEmergency = async (req, res) => {
  try {
    console.log("Emergency form data:", req.body);

    const {
      name,
      email,
      emergencyType,
      type,
      severity,
      location,
      description,
    } = req.body;

    const selectedType = emergencyType || type;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !selectedType?.trim() ||
      !severity?.trim() ||
      !location?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const trackingId = `SP-${Date.now()}`;

    const emergency = await Emergency.create({
      name: name.trim(),
      email: email.trim(),
      emergencyType: selectedType.trim(),
      severity: severity.trim(),
      location: location.trim(),
      description: description.trim(),
      trackingId,
    });

    return res.status(201).json({
      success: true,
      message: "Emergency report submitted successfully!",
      data: emergency,
    });
  } catch (error) {
    console.error("Emergency submission error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate tracking ID. Please try again.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to save emergency report.",
      error: error.message,
    });
  }
};

// Get all emergency reports
const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: emergencies.length,
      data: emergencies,
    });
  } catch (error) {
    console.error("Get emergencies error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve emergency reports.",
      error: error.message,
    });
  }
};

// Update emergency status in MongoDB
const updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const trackingId = req.params.id;

    console.log("Tracking ID received:", trackingId);
    console.log("New status received:", status);

    const allowedStatuses = [
      "Reported",
      "Under Review",
      "Assistance in Progress",
      "Resolved",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const emergency = await Emergency.findOneAndUpdate(
      { trackingId: trackingId },
      { $set: { status: status } },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    console.log("Updated emergency document:", emergency);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency report not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Emergency status updated successfully.",
      data: emergency,
    });
  } catch (error) {
    console.error("Update emergency status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update emergency status.",
      error: error.message,
    });
  }
};

export {
  createEmergency,
  getAllEmergencies,
  updateEmergencyStatus,
};
