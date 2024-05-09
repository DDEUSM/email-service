import { Project } from "../../../domain/entities/project";

export interface IProjectRepository {
    findByApiKey(apiKey: string, clientHost: string): Promise<Project>
}