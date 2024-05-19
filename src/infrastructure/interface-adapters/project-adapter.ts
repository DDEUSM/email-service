import { randomUUID } from "crypto";
import { Project } from "../../domain/entities/project";
import { Visibility } from "../../domain/enums/project-enum";
import { ProjectSchema } from "../schemas/project";
import { Adapter } from "./adapter";

type ProjectUpdateObject = {
    api_key_hash?: string,
    client_host?: string,
    title?: string,
    visibility?: Visibility
}

export class ProjectAdapter extends Adapter
{

    public static entityToDatabase(project: Project): ProjectSchema
    {
        return {
            id: project.id,
            api_key_hash: project.apiKeyHash,
            client_host: project.clientHost,
            owner_id: project.ownerId,
            title: project.title,
            visibility: project.visibility
        }
    }

    public static updateBodyToDatabase(projectUpdateObject: any): ProjectUpdateObject
    {
        let updateObject: ProjectUpdateObject = {
           api_key_hash: projectUpdateObject.apiKey,
           client_host: projectUpdateObject.clientHost,
           title: projectUpdateObject.title,
           visibility: projectUpdateObject.visibility
        }
       return ProjectAdapter.clearObject(updateObject)
    }

    public static queryToDatabase(projectQuery: {[key: string]: any}): any
    {
        let object = {
            id: projectQuery.id,
            api_key_hash: projectQuery.apiKey,
            client_host: projectQuery.clientHost,
            owner_id: projectQuery.ownerId,
            title: projectQuery.title,
            visibility: projectQuery.visibility
        }
        return ProjectAdapter.clearObject(object)
    }
}