import { describe, expect, test } from '@jest/globals'
import { EmailDto } from './infrastructure/dtos/email-dto'
import { UserDto } from './infrastructure/dtos/user-dto'

describe("test 1", () => 
{
    const endpoint = `http://localhost:4331`
    test("test 1.1", async () => {

        const email = new EmailDto (
            crypto.randomUUID(),
            "dedeus@live.com",
            "no-reply@live.com",
            "Teste 1",
            "Testando serviço de envio de emails"            
        )

        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch(endpoint+"/send-email", {
            method: 'POST',
            body: JSON.stringify(email),
            headers
        }).then(response => response.json())
        .then(data => { 
            console.log(data)
            return data 
        })

        expect(response).toBeTruthy()
    })

    test("test 1.2", async () => {

        const user = new UserDto (
           "David de Deus",
           "david@gmail.com",
           "12345"         
        )

        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch(endpoint+"/send-register-email", {
            method: 'POST',
            body: JSON.stringify(user),
            headers
        }).then(response => response.json())
        .then(data => { 
            console.log(data)
            return data 
        })

        expect(response).toBeTruthy()
    })
})