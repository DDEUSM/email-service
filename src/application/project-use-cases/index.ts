import { Project } from "../../domain/entities/project";
import { InProjectDto, OutProjectDto } from "../../infrastructure/dtos/project-dto";
import { IProjectRepository } from "../../infrastructure/repositories/project-repository/project-repository-interface";


export class ProjectUseCases 
{
    constructor (
        private projectRepository: IProjectRepository
    ){}


    private static GenerateApiKey(): string
    {
        return 'h0b88de101e00k4d4e%8652%b6527fe4b0d6'
    }

    async save (project: InProjectDto)
    {
        const newApiKeyHash = ProjectUseCases.GenerateApiKey()
        const newProject = Project.createProjectCredentials (
            project.clientHost,
            newApiKeyHash,
            project.ownerId,
            project.title,
            project.visibility
        )
        await this.projectRepository.save(newProject)
    }

    async find (projectQuery: any, offset: number, limit: number): Promise<OutProjectDto[]>
    {
        return await this.projectRepository.find(projectQuery, offset, limit)
    }
    
    async findByApiKey (apiKey: string, clientHost: string): Promise<OutProjectDto>
    {
        return await this.projectRepository.findByApiKey(apiKey, clientHost)
    }

    async findById (projectId: string): Promise<OutProjectDto>
    {
        return await this.projectRepository.findById(projectId)
    }


    async update (projectId: string, projectUpdate: any): Promise<void>
    {
        await this.projectRepository.update(projectId, projectUpdate)
    }

    async delete (projectId: string): Promise<void>
    {
        await this.projectRepository.delete(projectId)
    }
}