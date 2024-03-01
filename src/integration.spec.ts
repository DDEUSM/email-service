import { describe, expect, test } from '@jest/globals'
import { EmailDto } from './infrastructure/dtos/email-dto'

describe("test 1", () => 
{
    const endpoint = `http://nodejs:4331/send-email`
    test("test 1.1", async () => 
    {
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
        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(email),
            headers
        }).then(res => res)

        expect(response.status).toBeTruthy()
    })
})