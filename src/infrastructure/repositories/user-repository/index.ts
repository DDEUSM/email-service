import { User } from "../../../domain/entities/user";
import { GenerateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { UserDtoExtern } from "../../dtos/user-dto";
import { UserAdapter } from "../../interface-adapters/user-adapters";
import IUserRepository from "./user-repository-interface";

export class UserRepository implements IUserRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}
    
    async save(user: User): Promise<void> 
    {
        const userAdapted = UserAdapter.toDatabase(user)
        const values = Object.values(userAdapted)
        const query = GenerateQuery.insert("users", userAdapted)
        await this.dbConnection.query(query, values)
    }

    async findById(userId: string): Promise<UserDtoExtern | null> 
    {
        const query = "SELECT id, team_id, role_id, first_name, last_name, email, created_at FROM users WHERE id = $1;"
        const result = await this.dbConnection.one(query, userId)
        return new UserDtoExtern (
            result.id,
            result.team_id,
            result.role_id,
            result.first_name,
            result.last_name,
            result.email,
            result.created_at
        )
    }

    async find(userQuery: any, offset: number, itensLimit: number): Promise<UserDtoExtern[] | []>
    {
        const userAdapted = UserAdapter.queryToDatabase(userQuery)
        const values = Object.values(userAdapted)
        console.log(userAdapted, values)
        const query = GenerateQuery.query("users", userAdapted)
        return await this.dbConnection.query(query, values)
    }

    async update(userId: string, updatedData: any): Promise<void> 
    {
        const userAdapted = UserAdapter.queryToDatabase(updatedData)
        const update = GenerateQuery.updateOne("users", userId, userAdapted)
        const values = Object.values(userAdapted)
        await this.dbConnection.one(update, values)   
    }

    async delete(userId: string): Promise<void> 
    {
        const deleteQuery = GenerateQuery.deleteOne("users")
        await this.dbConnection.query(deleteQuery, [ userId ])    
    }
}