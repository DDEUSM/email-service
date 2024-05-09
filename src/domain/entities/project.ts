import { randomUUID } from "crypto";

export class Project 
{
    private constructor (
        readonly id: string,
        readonly apiKeyHash: string,
        readonly clientHost: string,
        readonly ownerId: string,
        readonly projectTitle: string
    ){}

    public static createProjectCredentials (
        apiKeyHash: string, 
        clientHost: string,
        ownerId: string,
        projectTitle: string
    ): Project 
    {
        return new Project (
            randomUUID(),
            apiKeyHash,
            clientHost,
            ownerId,
            projectTitle
        )
    }
}