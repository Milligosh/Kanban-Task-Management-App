import express from "express";

const api = express.Router();
import board from "../../routes/board";
import column from '../../routes/columns'
import task from '../../routes/task'
import subtask from '../../routes/subtask'
 
api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
  })
);

api.use("/board", board);
api.use('/column',column)
api.use('/task',task)
api.use('/subtask',subtask)
export default api;
