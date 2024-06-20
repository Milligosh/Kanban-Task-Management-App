import { Request,Response,NextFunction } from "express";
import { CreateColumnService } from "../services/columns";

export class columnController{
    static async createColumn(
        request:Request,response:Response,next:NextFunction
    ):Promise<any>{
        try {
            const boardId = parseInt(request.params.boardId, 10); 
            const { columnName } = request.body;

            const result = await CreateColumnService.newColumn(boardId, columnName);
            return response.status(result.code).json(result);
        } catch (error) {
            next (error)
        }
    }


      static async deleteColumn(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const columnId = parseInt(request.params.columnId, 10);
            const result = await CreateColumnService.deleteColumn(columnId);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateColumn(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const columnId = parseInt(request.params.columnId, 10);
            const { columnName } = request.body;
            const result = await CreateColumnService.updateColumn(columnId, columnName);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async fetchColumnsWithTaskCounts(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const result = await CreateColumnService.fetchColumnsWithTaskCounts();
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
}