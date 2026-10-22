import Assistance from "../models/assistanceModel.js";

// Create a new roadside / towing / mechanic assistance request
export const createAssistance = async (req, res) => {
  try {
    const { name, phone, assistanceType, type, location, details, description, priority } = req.body;
    const selectedType = assistanceType || type;
    const selectedDetails = details || description || "Roadside assistance requested.";

    if (!name?.trim() || !phone?.trim() || !selectedType?.trim() || !location?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, phone, assistance type, and location).",
      });
    }

    const count = await Assistance.countDocuments();
    const requestId = `AS-2026-${String(count + 41).padStart(4, "0")}`;

    const assistance = await Assistance.create({
      name: name.trim(),
      phone: phone.trim(),
      assistanceType: selectedType.trim(),
      location: location.trim(),
      details: selectedDetails.trim(),
      requestId,
      status: "Reported",
    });

    return res.status(201).json({
      success: true,
      message: "Assistance request dispatched successfully!",
      data: assistance,
    });
  } catch (error) {
    console.error("Assistance submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to dispatch assistance request.",
      error: error.message,
    });
  }
};

// Get all assistance requests
export const getAllAssistance = async (req, res) => {
  try {
    const assistanceList = await Assistance.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: assistanceList.length,
      data: assistanceList,
    });
  } catch (error) {
    console.error("Get assistance error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve assistance requests.",
      error: error.message,
    });
  }
};

// Update assistance status
export const updateAssistanceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const requestId = req.params.id;

    const allowedStatuses = [
      "Reported",
      "Under Review",
      "Assistance in Progress",
      "Resolved",
      "Accepted",
      "Completed",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assistance status.",
      });
    }

    const assistance = await Assistance.findOneAndUpdate(
      { requestId: requestId },
      { $set: { status } },
      { returnDocument: "after", runValidators: true }
    );

    if (!assistance) {
      return res.status(404).json({
        success: false,
        message: "Assistance request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Assistance status updated successfully.",
      data: assistance,
    });
  } catch (error) {
    console.error("Update assistance status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update assistance status.",
      error: error.message,
    });
  }
};
