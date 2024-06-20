import { Request, Response, NextFunction } from 'express';
function setBoardIdMiddleware(req:Request, res:Response, next:NextFunction) {
    // Example logic to set board ID
    const boardId = req.user.boardId; // Assuming the user's board ID is available in req.user
    req.data = { id: boardId };
    next();
}
