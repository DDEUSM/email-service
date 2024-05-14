import { Project } from "../../../domain/entities/project";
import { OutProjectDto } from "../../dtos/project-dto";

export interface IProjectRepository 
{
    save (newProject: Project): Promise<void>
    
    find (projectQuery: any, offset: number, limit: number): Promise<OutProjectDto[]>
    
    findById (projectId: string): Promise<OutProjectDto>
    
    findByApiKey (apiKey: string, clientHost: string): Promise<OutProjectDto>

    update (projectId: string, projectUpdate: any): Promise<void>

    delete (projectId: string): Promise<void>

}