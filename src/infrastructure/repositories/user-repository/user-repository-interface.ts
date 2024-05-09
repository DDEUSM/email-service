import { User } from "../../../domain/entities/user";
import { UserDtoExtern } from "../../dtos/user-dto";

export default interface IUserRepository
{
    save (user: User): Promise<void>
    findById(userId: string): Promise<UserDtoExtern | null>
    find(userQuery: any, offset: number, itensLimit: number): Promise<UserDtoExtern[] | []>
    update(userId: string, updatedData: any): Promise<void>
    delete(userId: string): Promise<void>
}