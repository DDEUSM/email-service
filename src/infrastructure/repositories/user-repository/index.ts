import { User } from "../../../domain/entities/user";
import { generateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import IUserRepository from "./user-repository-interface";

export class UserRepository implements IUserRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}
    
    async save(user: User): Promise<void> 
    {
        const query = generateQuery(user, "users")
        const userValues = Object.values(user)
        await this.dbConnection.query(query, userValues)
    }
}