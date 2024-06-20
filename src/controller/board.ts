import { Request,Response,NextFunction } from "express";
import { CreateBoardService } from "../services/board";

export class BoardController{
    static async createBoard(
        request:Request,response:Response,next:NextFunction
    ):Promise<any>{
        try {
            const result= await CreateBoardService.newBoard(request.body)
            return response.status(result.code).json(result)
        } catch (error) {
            next (error)
        }
    }

    static async fetchBoards(
        request:Request,response:Response,next:NextFunction
    ):Promise<any>{
        try {
            const result= await CreateBoardService.fetchAllBoards()
            return response.status(result.code).json(result)
        } catch (error) {
            next (error)
        }
    }
    static async deleteBoard(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const boardId = parseInt(request.params.boardId, 10);
            const result = await CreateBoardService.deleteBoard(boardId);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
      

    static async updateBoard(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const boardId = parseInt(request.params.boardId, 10);
            const { boardname } = request.body;
            const result = await CreateBoardService.updateBoard(boardId, boardname);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async fetchBoardWithColumns(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const boardId = parseInt(request.params.boardId, 10);
            const result = await CreateBoardService.fetchBoardWithColumns(boardId);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async fetchBoardWithDetails(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const boardId = parseInt(request.params.boardId, 10);
            const result = await CreateBoardService.fetchBoardWithDetails(boardId);
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }




    static async fetchAllBoardsWithColumnsAndTasks(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const result = await CreateBoardService.fetchAllBoardsWithColumnsAndTasks();
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async fetchAllTasksWithSubtaskCounts(
        request: Request, response: Response, next: NextFunction
    ): Promise<any> {
        try {
            const result = await CreateBoardService.fetchAllTasksWithSubtaskCounts();
            return response.status(result.code).json(result);
        } catch (error) {
            next(error);
        }
    }
}
