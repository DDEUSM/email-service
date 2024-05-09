import { User } from "../../domain/entities/user";
import { UserDtoExtern, UserDtoIntern } from "../../infrastructure/dtos/user-dto";
import IUserRepository from "../../infrastructure/repositories/user-repository/user-repository-interface";

export class UserUseCases
{
    constructor (
        private userRepository: IUserRepository
    ){}

    async createUser(userDto: UserDtoIntern): Promise<void> 
    {
        const newUser = User.createUser(userDto)
        await this.userRepository.save(newUser)
    }

    async findUserById(userId: string): Promise<UserDtoExtern | null>
    {
        return await this.userRepository.findById(userId)
    }

    async findUsers(userQuery: any, offset: number, itensLimit: number): Promise<UserDtoExtern[] | []>
    {
        return await this.userRepository.find(userQuery, offset, itensLimit)
    }

    async updateOneUser(userId: string, updatedData: any): Promise<void>
    {
        await this.userRepository.update(userId, updatedData)
    }

    async deleteUser(userId: string): Promise<void>
    {
        await this.userRepository.delete(userId)
    }
}