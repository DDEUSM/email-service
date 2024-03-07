import { UserDto } from "../../infrastructure/dtos/user-dto";

export class User
{
    private constructor (
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ){}

    static createUser(userDto: UserDto)
    {
        return new User (
            userDto.name,
            userDto.email,
            userDto.password
        )
    }
}