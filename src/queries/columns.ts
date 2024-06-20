export const columnQueries = {
  createColumn: `INSERT INTO columns(
        boardId,
        columnName
    )values($1,$2) RETURNING *`,
  checkIfBoardExists: `SELECT * FROM board WHERE id = $1`,
  checkIfColumnExists: `SELECT * FROM columns WHERE id = $1`,
  deleteColumn: `DELETE FROM columns WHERE id = $1 RETURNING *`,
  updateColumn: `UPDATE columns SET columnName = $1, updatedat = NOW() WHERE id = $2 RETURNING *`,
  fetchAllColumnsForABoard: `SELECT boardId, id, created_at
   FROM boards
   WHERE TRUE AND boardId=$1 `,
  fetchColumnsWithTaskCounts: `
        SELECT 
            c.id AS columnId, c.columnName, COUNT(t.id) AS taskCount
        FROM columns c
        LEFT JOIN tasks t ON t.columnId = c.id
        GROUP BY c.id, c.columnName
    `,
};
