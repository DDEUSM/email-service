import { randomUUID } from "crypto";
import { UserDtoIntern } from "../../infrastructure/dtos/user-dto";

export class User
{
    private constructor (
        public readonly id: string,
        public readonly teamId: string | null,
        public readonly roleId: string | null,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string
    ){}

    static createUser(userDto: UserDtoIntern)
    {
        return new User (
            randomUUID(),
            userDto.teamId,
            userDto.roleId,
            userDto.firstName,
            userDto.lastName,
            userDto.email,
            userDto.password
        )
    }
}