import pool from "../config/database/db";
import { boardQueries } from "../queries/board";

interface Task {
    taskId: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Column {
    columnId: number;
    columnName: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
    taskCount: number;
}

interface Board {
    boardId: number;
    boardname: string;
    createdAt: Date;
    updatedAt: Date;
    columns: Column[];
}

interface RowData {
    boardid: number;
    boardname: string;
    boardcreatedat: Date;
    boardupdatedat: Date;
    columnid: number;
    columnname: string;
    columncreatedat: Date;
    columnupdatedat: Date;
    taskid: number;
    title: string;
    description: string;
    taskcreatedat: Date;
    taskupdatedat: Date;
}

export class CreateBoardService {
    static async newBoard(body: any): Promise<any> {
        const { boardname } = body;
        const response = await pool.query(boardQueries.createBoard, [boardname]);
        const newBoard = response.rows[0];

        return {
            code: 201,
            status: "success",
            message: "New Board added successfully",
            data: newBoard,
        };
    }

    static async fetchAllBoards():Promise<any>{
        const boardsResponse = await pool.query(boardQueries.fetchAllBoards);
        const countResponse = await pool.query(boardQueries.countBoards);

        const boards = boardsResponse.rows;
        const count = countResponse.rows[0].count;

        return {
            code: 200,
            status: 'success',
            message: 'Boards fetched successfully',
            data:boards,count
        }
    }
    static async deleteBoard(boardId: number): Promise<any> {
        try {
            
            const boardCheck = await pool.query(boardQueries.checkIfBoardExist, [boardId]);
            if (boardCheck.rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Board not found",
                    data: null,
                };
            }

            
            const { rows } = await pool.query(boardQueries.deleteBoard, [boardId]);
            return {
                code: 200,
                status: "success",
                message: "Board deleted successfully",
                data: rows[0], 
            };
        } catch (error: any) {
            console.error("Error deleting board:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while deleting the board",
                error: error.message,
            };
        }
    }

    static async updateBoard(boardId: number, boardname: string): Promise<any> {
        try {
            const boardCheck = await pool.query(boardQueries.checkIfBoardExist, [boardId]);
            if (boardCheck.rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Board not found",
                    data: null,
                };
            }

            const { rows } = await pool.query(boardQueries.updateBoard, [boardname, boardId]);
            return {
                code: 200,
                status: "success",
                message: "Board updated successfully",
                data: rows[0],
            };
        } catch (error: any) {
            console.error("Error updating board:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while updating the board",
                error: error.message,
            };
        }
    }

    static async fetchBoardWithColumns(boardId: number): Promise<any> {
        try {
            const { rows } = await pool.query(boardQueries.fetchBoardWithColumns, [boardId]);

            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Board not found",
                    data: null
                };
            }

            // Extract board information from the first row
            const { boardid, boardname, boardcreatedat, boardupdatedat } = rows[0];

            // Extract columns information
            const columns = rows.map(row => ({
                columnId: row.columnid,
                columnName: row.columnname,
                createdAt: row.columncreatedat,
                updatedAt: row.columnupdatedat
            })).filter(column => column.columnId !== null);

            return {
                code: 200,
                status: "success",
                message: "Board fetched successfully",
                data: {
                    boardId: boardid,
                    boardname: boardname,
                    createdAt: boardcreatedat,
                    updatedAt: boardupdatedat,
                    columns: columns
                }
            };
        } catch (error: any) {
            console.error("Error fetching board with columns:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while fetching the board",
                error: error.message
            };
        }
    }


    

   
    static async fetchBoardWithDetails(boardId: number): Promise<any> {
        try {
            const { rows }: { rows: RowData[] } = await pool.query(boardQueries.fetchAllBoardswithColumnsAndCountTask, [boardId]);

            if (rows.length === 0) {
                return {
                    code: 404,
                    status: "error",
                    message: "Board not found",
                    data: null
                };
            }

            const board: Board = {
                boardId: rows[0].boardid,
                boardname: rows[0].boardname,
                createdAt: rows[0].boardcreatedat,
                updatedAt: rows[0].boardupdatedat,
                columns: []
            };

            const columnsMap: { [columnId: number]: Column } = {};

            rows.forEach(row => {
                if (row.columnid) {
                    if (!columnsMap[row.columnid]) {
                        columnsMap[row.columnid] = {
                            columnId: row.columnid,
                            columnName: row.columnname,
                            createdAt: row.columncreatedat,
                            updatedAt: row.columnupdatedat,
                            tasks: [],
                            taskCount: 0
                        };
                        board.columns.push(columnsMap[row.columnid]);
                    }

                    if (row.taskid) {
                        columnsMap[row.columnid].tasks.push({
                            taskId: row.taskid,
                            title: row.title,
                            description: row.description,
                            createdAt: row.taskcreatedat,
                            updatedAt: row.taskupdatedat
                        });
                        columnsMap[row.columnid].taskCount++;
                    }
                }
            });

            return {
                code: 200,
                status: "success",
                message: "Board fetched successfully",
                data: board
            };
        } catch (error: any) {
            console.error("Error fetching board with details:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while fetching the board",
                error: error.message
            };
        }
    }
    
    
















    static async fetchAllBoardsWithColumnsAndTasks(): Promise<any> {
        try {
            const { rows } = await pool.query(boardQueries.fetchAllBoardsWithColumnsAndTasks);

            return {
                code: 200,
                status: "success",
                message: "Boards fetched successfully with columns and task counts",
                data: rows
            };
        } catch (error: any) {
            console.error("Error fetching boards with columns and task counts:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while fetching boards",
                error: error.message
            };
        }
    }

    static async fetchAllTasksWithSubtaskCounts(): Promise<any> {
        try {
            const { rows } = await pool.query(boardQueries.fetchAllTasksWithSubtaskCounts);

            return {
                code: 200,
                status: "success",
                message: "Tasks fetched successfully with subtask counts",
                data: rows
            };
        } catch (error: any) {
            console.error("Error fetching tasks with subtask counts:", error);
            return {
                code: 500,
                status: "error",
                message: "An error occurred while fetching tasks",
                error: error.message
            };
        }
    }
}
