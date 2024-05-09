import { Project } from "../../../domain/entities/project"
import { IProjectRepository } from "./project-repository-interface"

export class ProjectRepository implements IProjectRepository
{
    private authDatabase: Project[] = [
        Project.createProjectCredentials ( 
            "b0b77de101e00?4d4e%8652%b6527fe4b0d9", 
            "http://localhost:0",
            "o530c2ca-bffd-4e4d-a4da-bf7cdfa66374",
            "projeto de teste"
        )
    ]

    async findByApiKey(apiKey: string, clientHost: string): Promise<Project> 
    {
        let apiKeyHash = apiKey
        return this.authDatabase.find(authData => authData.apiKeyHash === apiKeyHash && authData.clientHost === clientHost)
    }
}