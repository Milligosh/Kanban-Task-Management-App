import express from "express";
import { SubtaskController } from "../controller/subtask";

const router = express.Router();


router.post("/:taskId", SubtaskController.createSubtask);


router.delete("/:subtaskId", SubtaskController.deleteSubtask);


router.put("/:subtaskId", SubtaskController.updateSubtask);


router.patch("/:subtaskId/toggle", SubtaskController.toggleSubtask);

export default router;
