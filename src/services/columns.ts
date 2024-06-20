import pool from "../config/database/db";
import { columnQueries } from "../queries/columns";



    export class CreateColumnService {
        static async newColumn(boardId: number, columnName: string): Promise<any> {
            try {
                
                const boardCheck = await pool.query(columnQueries.checkIfBoardExists, [boardId]);
                if (boardCheck.rows.length === 0) {
                    return {
                        code: 400,
                        status: "error",
                        message: "Board does not exist",
                        data: null,
                    };
                }
    
               
                const { rows } = await pool.query(columnQueries.createColumn, [
                    boardId,
                    columnName
                ]);
    
                return {
                    code: 201,
                    status: "success",
                    message: "New column created successfully",
                    data: rows[0],
                };
            } catch (error: any) {
                console.error("Error creating column:", error);
                return {
                    code: 500,
                    status: "error",
                    message: "An error occurred while creating the column",
                    error: error.message,
                };
            }
        }        
          
          
          static async deleteColumn(columnId: number): Promise<any> {
            try {
               
                const columnCheck = await pool.query(columnQueries.checkIfColumnExists, [columnId]);
                if (columnCheck.rows.length === 0) {
                    return {
                        code: 404,
                        status: "error",
                        message: "Column not found",
                        data: null,
                    };
                }
    
               
                const { rows } = await pool.query(columnQueries.deleteColumn, [columnId]);
                return {
                    code: 200,
                    status: "success",
                    message: "Column deleted successfully",
                    data: rows[0],
                };
            } catch (error: any) {
                console.error("Error deleting column:", error);
                return {
                    code: 500,
                    status: "error",
                    message: "An error occurred while deleting the column",
                    error: error.message,
                };
            }
        }
    
        static async updateColumn(columnId: number, columnName: string): Promise<any> {
            try {
                
                const columnCheck = await pool.query(columnQueries.checkIfColumnExists, [columnId]);
                if (columnCheck.rows.length === 0) {
                    return {
                        code: 404,
                        status: "error",
                        message: "Column not found",
                        data: null,
                    };
                }
    
                
                const { rows } = await pool.query(columnQueries.updateColumn, [columnName, columnId]);
                return {
                    code: 200,
                    status: "success",
                    message: "Column updated successfully",
                    data: rows[0],
                };
            } catch (error: any) {
                console.error("Error updating column:", error);
                return {
                    code: 500,
                    status: "error",
                    message: "An error occurred while updating the column",
                    error: error.message,
                };
            }
        }

        static async fetchColumnsWithTaskCounts(): Promise<any> {
            try {
                const { rows } = await pool.query(columnQueries.fetchColumnsWithTaskCounts);
    
                return {
                    code: 200,
                    status: "success",
                    message: "Columns fetched successfully with task counts",
                    data: rows
                };
            } catch (error: any) {
                console.error("Error fetching columns with task counts:", error);
                return {
                    code: 500,
                    status: "error",
                    message: "An error occurred while fetching columns",
                    error: error.message
                };
            }
        }
    }

