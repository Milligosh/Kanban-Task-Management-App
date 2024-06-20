import  express  from "express";
const router = express.Router()
import { BoardController } from "../controller/board";

router.post("/new-board",BoardController.createBoard);
router.get("/",BoardController.fetchBoards)
// // GET boards - Fetch all boards with columns and task counts
// router.get("/boards", BoardController.fetchAllBoardsWithColumnsAndTasks);

// // GET /tasks - Fetch all tasks with subtask counts
 router.get("/tasks", BoardController.fetchAllTasksWithSubtaskCounts);
router.get("/:boardId/details", BoardController.fetchBoardWithDetails);
router.delete("/boards/:boardId",  BoardController.deleteBoard);
router.put("/boards/:boardId", BoardController.updateBoard);
router.get("/:boardId", BoardController.fetchBoardWithColumns);

export default router