import pool from "../config/database/db";
import { subtaskQueries } from "../queries/subtask";

export class SubtaskService {
    static async createSubtask(taskId: number, description: string): Promise<any> {
        // Check if the task exists
        const checkTaskExistsQuery = `SELECT id FROM tasks WHERE id = $1`;
        const taskResult = await pool.query(checkTaskExistsQuery, [taskId]);

        if (taskResult.rows.length === 0) {
            return {
                code: 400,
                status: "error",
                message: "Task does not exist",
                data: null
            };
        }

        // If task exists, create the subtask
        try {
            const { rows } = await pool.query(subtaskQueries.createSubtask, [taskId, description]);
            return {
                code: 201,
                status: "success",
                message: "New subtask created successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error creating subtask:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while creating the subtask",
                error: error.message
            };
        }
    }

    static async deleteSubtask(subtaskId: number): Promise<any> {
        try {
            const { rows } = await pool.query(subtaskQueries.deleteSubtask, [subtaskId]);
            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Subtask not found"
                };
            }
            return {
                code: 200,
                status: "success",
                message: "Subtask deleted successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error deleting subtask:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while deleting the subtask",
                error: error.message
            };
        }
    }

    static async updateSubtask(subtaskId: number, description: string, completed: boolean): Promise<any> {
        try {
            const { rows } = await pool.query(subtaskQueries.updateSubtask, [description, completed, subtaskId]);
            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Subtask not found"
                };
            }
            return {
                code: 200,
                status: "success",
                message: "Subtask updated successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error updating subtask:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while updating the subtask",
                error: error.message
            };
        }
    }

    static async toggleSubtask(subtaskId: number, completed: boolean): Promise<any> {
        try {
            const { rows } = await pool.query(subtaskQueries.toggleSubtask, [completed, subtaskId]);
            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Subtask not found"
                };
            }
            return {
                code: 200,
                status: "success",
                message: "Subtask status toggled successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error toggling subtask status:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while toggling the subtask status",
                error: error.message
            };
        }
    }
}
