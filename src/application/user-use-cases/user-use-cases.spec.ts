import { UserDtoIntern } from "../../infrastructure/dtos/user-dto"
import { UserUseCases } from "."
import { UserRepositoryMock } from "../../infrastructure/repositories/user-repository/mock"


describe("user repository test", () => 
{
    const userRepositoryMock = new UserRepositoryMock()
    const userUseCases = new UserUseCases(userRepositoryMock)
    
    const userDto = new UserDtoIntern (
        "john",
        "doe",
        "johnDoe@gmail.com",
        "dfdfv34355fgjikil",
    )

    let newUser: any

    test("save user | get him", async () => 
    {
        await userUseCases.createUser(userDto)

        const result = await userUseCases.findUsers({ email: userDto.email }, 0, 0)
        console.log(result)
        expect(result[0].email).toBe(userDto.email)
        newUser = result[0]
    })

    test("delete user | try to get him", async () => 
    {
        try 
        {
            await userUseCases.deleteUser(newUser.id)
            
            await userUseCases.findUserById(newUser.id)
        } 
        catch (error)
        {
            console.log(error)
        } 
    })

   
})