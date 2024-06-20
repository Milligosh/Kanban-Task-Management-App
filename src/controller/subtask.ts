import { Request, Response, NextFunction } from "express";
import { SubtaskService } from "../services/subtask";

export class SubtaskController {
    static async createSubtask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { description } = request.body;
            const { taskId } = request.params;

            const result = await SubtaskService.createSubtask(Number(taskId), description);

            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteSubtask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { subtaskId } = request.params;
            const result = await SubtaskService.deleteSubtask(Number(subtaskId));
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateSubtask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { subtaskId } = request.params;
            const { description, completed } = request.body;
            const result = await SubtaskService.updateSubtask(Number(subtaskId), description, completed);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async toggleSubtask(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const { subtaskId } = request.params;
            const { completed } = request.body;
            const result = await SubtaskService.toggleSubtask(Number(subtaskId), completed);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
}
