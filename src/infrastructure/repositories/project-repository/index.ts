import { Project } from "../../../domain/entities/project"
import { GenerateQuery } from "../../../utils/construct-query"
import { ConnectionDatabase } from "../../database/connection-interface"
import { OutProjectDto } from "../../dtos/project-dto"
import { ProjectAdapter } from "../../interface-adapters/project-adapter"
import { ProjectSchema } from "../../schemas/project"
import { IProjectRepository } from "./project-repository-interface"

export class ProjectRepository implements IProjectRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save(newProject: Project): Promise<void> 
    {
        const projectAdapted = ProjectAdapter.entityToDatabase(newProject)
        const insert = GenerateQuery.insert("projects", Object.keys(projectAdapted))
        await this.dbConnection.query(insert, Object.values(projectAdapted))
    }

    async findById(projectId: string): Promise<OutProjectDto | null> 
    {
        const queryOne = GenerateQuery.query("projects", ["id"])
        const foundedProject: ProjectSchema = await this.dbConnection.one(queryOne, [projectId])

        return foundedProject? 
            new OutProjectDto (
                foundedProject.id,
                foundedProject.api_key_hash,
                foundedProject.client_host,
                foundedProject.owner_id,
                foundedProject.title,
                foundedProject.visibility,
                foundedProject.created_at
            )
        :
            null
    }

    async find(projectQuery: any, offset: number, limit: number): Promise<OutProjectDto[]> 
    {
        const adaptedData = ProjectAdapter.queryToDatabase(projectQuery)
        const query = GenerateQuery.query("projects", Object.keys(adaptedData), offset, limit)
        const foundedProjects: ProjectSchema[] = await this.dbConnection.query(query, Object.values(adaptedData)) 

        return foundedProjects.length? 
            foundedProjects.map(project => new OutProjectDto (
                project.id,
                project.api_key_hash,
                project.client_host,
                project.owner_id,
                project.title,
                project.visibility,
                project.created_at
            )) 
        : 
            []
    }

    async findByApiKey(apiKey: string, clientHost: string): Promise<OutProjectDto> 
    {
        const queryOne = GenerateQuery.query("projects", ["api_key_hash", "client_host"])
        const foundedProject: ProjectSchema = await this.dbConnection.one(queryOne, [apiKey, clientHost])
        
        return foundedProject? 
            new OutProjectDto (
                foundedProject.id,
                foundedProject.api_key_hash,
                foundedProject.client_host,
                foundedProject.owner_id,
                foundedProject.title,
                foundedProject.visibility,
                foundedProject.created_at
            )
        :
            null
    }

    async update(projectId: string, projectUpdate: any): Promise<void> 
    {
        const adaptedData = ProjectAdapter.updateBodyToDatabase(projectUpdate)
        const query = GenerateQuery.updateOne("projects", projectId, Object.keys(adaptedData))
        await this.dbConnection.query(query, Object.values(adaptedData))
    }

    async delete(projectId: string): Promise<void> 
    {
        const query = GenerateQuery.deleteOne("projects")
        await this.dbConnection.query(query, [projectId])
    }
}