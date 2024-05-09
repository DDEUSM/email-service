import { NextFunction } from "express";
import { ApiError } from "../server/http-server/api-error";
import { IProjectRepository } from "../repositories/project-repository/project-repository-interface";

export class ProjectAuthHandler 
{
    private static projectRepository: IProjectRepository

    public static config(repository: IProjectRepository)
    {
        ProjectAuthHandler.projectRepository = repository
    }

    public static async projectAuth(req: Request, res: Response, next: NextFunction): Promise<any>
    {
        const apiKey = req.headers['authorization']
        const apiKeyToken = apiKey.split(' ')[1]
        if (!apiKeyToken)
        {
            return next(new ApiError(400, 'api Key is not present on header!'))
        }
        const projectFounded = await ProjectAuthHandler.projectRepository.findByApiKey(apiKeyToken, "http://localhost:0")
        if (!projectFounded)
        {
            return next(new ApiError(401, 'Unauthorized!'))
        }
        next()
    }
}