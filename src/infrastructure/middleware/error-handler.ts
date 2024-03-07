import { Request, Response, NextFunction } from "express";
import { ApiError } from "../server/http-server/api-error";

export class ErrorHandler
{
    public static handler(error: any, req: Request, res: Response, next: NextFunction)
    {
        return error instanceof ApiError?
            res.status(error.statusCode).json({ message: error.message })
        :
            res.status(500).json({ message: "Unknown error!" })
    }
}