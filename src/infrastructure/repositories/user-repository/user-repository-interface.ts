import { User } from "../../../domain/entities/user";

export default interface IUserRepository
{
    save (user: User): Promise<void>
}