export const taskQueries = {
    createTask: `INSERT INTO tasks (boardId, columnId, title, description) VALUES ($1, $2, $3, $4) RETURNING *`,
    checkIfColumnExist:`SELECT * FROM columns WHERE id = $1`,
    checkIfBoardExist:`SELECT * FROM board WHERE id = $1`,
    // fetchTasksByBoardAndColumn: `SELECT * FROM tasks WHERE boardId = $1 AND columnId = $2`,
    deleteTask: `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    updateTask: `UPDATE tasks SET title = $1, description = $2, updatedat = NOW() WHERE id = $3 RETURNING *`,
    fetchTaskWithSubDetails: `
        SELECT 
            t.id AS taskId, t.title, t.description, t.createdAt AS taskCreatedAt, t.updatedAt AS taskUpdatedAt,
            s.id AS subtaskId, s.description AS subtaskDescription, s.completed, s.createdAt AS subtaskCreatedAt, s.updatedAt AS subtaskUpdatedAt,
            c.columnName
        FROM tasks t
        LEFT JOIN subtasks s ON t.id = s.taskId
        LEFT JOIN columns c ON t.columnId = c.id
        WHERE t.id = $1
       
    `,
    
};
