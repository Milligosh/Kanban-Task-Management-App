export const boardQueries={
    createBoard:`INSERT INTO board (
        boardname
    )values($1) RETURNING *`,
    fetchAllBoards:`SELECT * FROM board`,
    checkIfBoardExist:`SELECT * FROM board where id=$1`,
    fetchBoardByID:`Select id,boardname FROM board WHERE id=$1`,
    deleteBoard:` DELETE FROM board where id=$1`,
    updateBoard: `UPDATE board SET boardname=$1 WHERE id=$2 RETURNING *`,
    countBoards: `SELECT COUNT(*) FROM board`,

    fetchBoardWithColumns: `
    SELECT 
        b.id AS boardId, 
        b.boardname, 
        b.createdat AS boardCreatedAt, 
        b.updatedat AS boardUpdatedAt,
        c.id AS columnId,
        c.columnName,
        c.createdat AS columnCreatedAt,
        c.updatedat AS columnUpdatedAt
    FROM board b
    LEFT JOIN columns c ON b.id = c.boardId
    WHERE b.id = $1
`,

fetchAllBoardswithColumnsAndCountTask:`SELECT 
b.id AS boardId, 
b.boardname, 
b.createdat AS boardCreatedAt, 
b.updatedat AS boardUpdatedAt,
c.id AS columnId, 
c.columnname, 
c.createdat AS columnCreatedAt, 
c.updatedat AS columnUpdatedAt,
t.id AS taskId, 
t.title, 
t.description, 
t.createdat AS taskCreatedAt, 
t.updatedat AS taskUpdatedAt
FROM board b
LEFT JOIN columns c ON b.id = c.boardId
LEFT JOIN tasks t ON c.id = t.columnId
LEFT JOIN subtasks s ON t.id = s.taskId
WHERE b.id = $1;`,





    fetchAllBoardsWithColumnsAndTasks: `
        SELECT 
            b.id AS boardId, b.boardname,
            c.id AS columnId, c.columnName,
            COUNT(t.id) AS totalTasks,
            COUNT(s.id) FILTER (WHERE s.completed = true) AS completedSubtasks
        FROM board b
        LEFT JOIN columns c ON b.id = c.boardId
        LEFT JOIN tasks t ON c.id = t.columnId
        LEFT JOIN subtasks s ON t.id = s.taskId
        GROUP BY b.id, b.boardname, c.id, c.columnName
    `,
    fetchAllTasksWithSubtaskCounts: `
        SELECT 
            t.id AS taskId, t.title, t.description, t.createdAt AS taskCreatedAt, t.updatedAt AS taskUpdatedAt,c.id AS columnId,
            c.columnName,
            COUNT(s.id) AS totalSubtasks,
            COUNT(s.id) FILTER (WHERE s.completed = true) AS completedSubtasks
        FROM tasks t
        LEFT JOIN subtasks s ON t.id = s.taskId
        LEFT JOIN columns c ON t.columnId = c.id
        GROUP BY t.id,c.id, c.columnName
    `,


    
}