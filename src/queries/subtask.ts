export const subtaskQueries = {
    createSubtask: `INSERT INTO subtasks (taskId, description) VALUES ($1, $2) RETURNING *`,
    deleteSubtask: `DELETE FROM subtasks WHERE id = $1 RETURNING *`,
    updateSubtask: `UPDATE subtasks SET description = $1, completed = $2, updatedAt = NOW() WHERE id = $3 RETURNING *`,
    toggleSubtask: `UPDATE subtasks SET completed = $1, updatedAt = NOW() WHERE id = $2 RETURNING *`
};
