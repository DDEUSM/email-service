import { randomUUID } from "crypto";
import { Visibility } from "../enums/project-enum";

export class Project 
{
    private constructor (
        readonly id: string,
        readonly clientHost: string,
        readonly apiKeyHash: string,
        readonly ownerId: string,
        readonly title: string,
        readonly visibility: Visibility
    ){}

    public static createProjectCredentials (
        clientHost: string,
        apiKeyHash: string,
        ownerId: string,
        title: string,
        visibility: Visibility
    ): Project 
    {
        return new Project (
            randomUUID(),
            clientHost,
            apiKeyHash,
            ownerId,
            title,
            visibility
        )
    }
}