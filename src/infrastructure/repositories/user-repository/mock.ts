import { randomUUID } from "crypto";
import { User } from "../../../domain/entities/user";
import { UserDtoExtern } from "../../dtos/user-dto";
import IUserRepository from "./user-repository-interface";

export class UserRepositoryMock implements IUserRepository
{
    async save(user: User): Promise<void> {}

    async find(userQuery: any, offset: number, itensLimit: number): Promise<UserDtoExtern[] | []> 
    {
        return [ 
            new UserDtoExtern (
                randomUUID(),
                randomUUID(),
                randomUUID(), 
                "David",
                "De Deus",
                "david@gmail.com",
                new Date().toLocaleString("pt-br")
            ) 
        ]    
    }

    async findById(userId: string): Promise<UserDtoExtern>
    {
        return new UserDtoExtern (
            randomUUID(),
            randomUUID(),
            randomUUID(), 
            "David",
            "De Deus",
            "david@gmail.com",
            new Date().toLocaleString("pt-br")
        )    
    }

    async update(userId: string, updatedData: any): Promise<void> {}

    async delete(userId: string): Promise<void> {}
}