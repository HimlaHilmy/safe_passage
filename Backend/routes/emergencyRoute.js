
import express from "express";
import {
  createEmergency,
  getAllEmergencies,
  updateEmergencyStatus,
} from "../controllers/emergencyController.js";

const router = express.Router();

router.get("/", getAllEmergencies);
router.post("/", createEmergency);
router.patch("/:id/status", updateEmergencyStatus);

export default router;
