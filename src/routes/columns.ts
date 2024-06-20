import  express  from "express";
const router = express.Router()
import {  columnController} from "../controller/columns";

router.post("/boards/:boardId/new-column",columnController.createColumn);
router.get("/", columnController.fetchColumnsWithTaskCounts);
router.delete("/columns/:columnId", columnController.deleteColumn); 
router.put("/columns/:columnId", columnController.updateColumn);


export default router
