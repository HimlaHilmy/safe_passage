
import express from "express";

import {
  createAssistance,
  getAllAssistance,
  updateAssistanceStatus,
} from "../controllers/assistanceController.js";

const router = express.Router();

router.get("/", getAllAssistance);
router.post("/", createAssistance);
router.patch("/:id/status", updateAssistanceStatus);

export default router;
