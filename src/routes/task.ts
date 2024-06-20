import express from "express";
import { TaskController } from "../controller/task";

const router = express.Router();


router.post("/:boardId/:columnId/task", TaskController.createTask);


router.delete("/:taskId", TaskController.deleteTask);

router.put("/:taskId", TaskController.updateTask);

router.get("/:taskId/details", TaskController.fetchTaskWithSubDetails);

export default router;
