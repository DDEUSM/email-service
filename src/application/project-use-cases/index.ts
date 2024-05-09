import { Project } from "../../domain/entities/project";
import { IProjectRepository } from "../../infrastructure/repositories/project-repository/project-repository-interface";

export class ProjectUseCases 
{
    constructor (
        private projectRepository: IProjectRepository
    ){}
    

    create (projectData: any)
    {
    }

    get ()
    {

    }

    async getById (apiKey: string, clientHost: string): Promise<Project>
    {
        return this.projectRepository.findById(apiKey, clientHost)
    }

    update ()
    {

    }

    delete ()
    {

    }

}