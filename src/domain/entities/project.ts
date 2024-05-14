import { randomUUID } from "crypto";
import { Visibility } from "../enums/project-enum";

export class Project 
{
    private constructor (
        readonly id: string,
        readonly apiKey: string,
        readonly clientHost: string,
        readonly ownerId: string,
        readonly title: string,
        readonly visibility: Visibility
    ){}

    public static createProjectCredentials (
        apiKey: string, 
        clientHost: string,
        ownerId: string,
        title: string,
        visibility: Visibility
    ): Project 
    {
        return new Project (
            randomUUID(),
            apiKey,
            clientHost,
            ownerId,
            title,
            visibility
        )
    }
}