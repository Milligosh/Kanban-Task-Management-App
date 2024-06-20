import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task";

export class TaskController {
    static async createTask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { title, description } = request.body;
            const { boardId, columnId } = request.params;

            const result = await TaskService.createTask(Number(boardId), Number(columnId), title, description);

            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteTask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { taskId } = request.params;
            const result = await TaskService.deleteTask(Number(taskId));
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateTask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { taskId } = request.params;
            const { title, description } = request.body;
            const result = await TaskService.updateTask(Number(taskId), title, description);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
    
    static async fetchTaskWithSubDetails(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { taskId } = request.params;
            const result = await TaskService.fetchTaskWithDetails(Number(taskId));
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

   
}


