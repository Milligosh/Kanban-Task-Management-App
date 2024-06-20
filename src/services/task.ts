import pool from "../config/database/db";
import { taskQueries } from "../queries/task";

export class TaskService {
    static async createTask(boardId: number, columnId: number, title: string, description: string): Promise<any> {
        try {
            const { rows } = await pool.query(taskQueries.createTask, [boardId, columnId, title, description]);
            return {
                code: 201,
                status: "success",
                message: "New task created successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error creating task:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while creating the task",
                error: error.message
            };
        }
    }

    static async deleteTask(taskId: number): Promise<any> {
        try {
            const { rows } = await pool.query(taskQueries.deleteTask, [taskId]);
            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Task not found"
                };
            }
            return {
                code: 200,
                status: "success",
                message: "Task deleted successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error deleting task:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while deleting the task",
                error: error.message
            };
        }
    }

    static async updateTask(taskId: number, title: string, description: string): Promise<any> {
        try {
            const { rows } = await pool.query(taskQueries.updateTask, [title, description, taskId]);
            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Task not found"
                };
            }
            return {
                code: 200,
                status: "success",
                message: "Task updated successfully",
                data: rows[0]
            };
        } catch (error: any) {
            console.error("Error updating task:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while updating the task",
                error: error.message
            };
        }
    }

    
    static async fetchTaskWithDetails(taskId: number): Promise<any> {
        try {
            const { rows } = await pool.query(taskQueries.fetchTaskWithSubDetails, [taskId]);

            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Task not found",
                    data: null
                };
            }

            // Group the results directly into the task structure
            const task = {
                taskId: rows[0].taskid,
                title: rows[0].title,
                description: rows[0].description,
                columnName: rows[0].columnname,
                createdAt: rows[0].taskcreatedat,
                updatedAt: rows[0].taskupdatedat,
                subtasks: rows.map(row => ({
                    subtaskId: row.subtaskid,
                    description: row.subtaskdescription,
                    completed: row.completed,
                    createdAt: row.subtaskcreatedat,
                    updatedAt: row.subtaskupdatedat
                }))
            };

            return {
                code: 200,
                status: "success",
                message: "Task fetched successfully",
                data: task
            };
        } catch (error: any) {
            console.error("Error fetching task with details:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while fetching the task",
                error: error.message
            };
        }
    }
    

}


