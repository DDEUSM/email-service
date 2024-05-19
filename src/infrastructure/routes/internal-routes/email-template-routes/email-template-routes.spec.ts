import axios from "axios"
import { host, port } from "../../../../env"


describe("email template routes test", () => 
{
    // npx jest ./src/infrastructure/routes/internal-routes/email-template-routes/email-template-routes.spec.ts

    const BASE_URL = `http://${host}:${port}`
    const updateBody = {
        title: "New title 2.0 to email template"
    }

    const emailTemplateDto = {
        projectId: '7e5fed81-77e0-4ca9-a05b-9c90492ca5eb',
        title: 'email template teste',
        subject: 'assunto de teste',
        html: '<h1>Hello World!</h1>'
    }

    test("test #1 Create email template", async () => 
    {
        const response: any = await axios.post (
            BASE_URL+"/email-templates",
            emailTemplateDto,
            {
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9',
                    'Content-Type': 'application/json'
                }
            }
        ).catch(error => console.log(error))

        expect(response.status).toBe(201)
    })
    
    test("test #2 Get email templates", async () => 
    {
        const response: any = await axios.get(
            BASE_URL+"/email-templates?" + new URLSearchParams({
                title: emailTemplateDto.title,
                subject: emailTemplateDto.subject,
                offset: '0',
                limit: '10'
            }), 
            {
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9'
                }
            }
        )
        .catch(error => console.log(error))
  
        expect(response.data[0].title).toBe(emailTemplateDto.title)
        expect(response.data[0].projectId).toBe(emailTemplateDto.projectId)

        emailTemplateDto['id'] = response.data[0].id 
    })

    test("test #3 update email template", async () => 
    {
        const response = await axios.put(
            BASE_URL+"/email-templates/"+emailTemplateDto["id"],
            updateBody
        )
        expect(response.status).toBe(204)
    })

    test("test #4 Verify email template after update", async () => 
        {
            const response = await axios.get(
                BASE_URL+"/email-templates/"+emailTemplateDto["id"], 
            )

            expect(response.data.title).toBe(updateBody.title)
            expect(response.data.id).toBe(emailTemplateDto['id'])
        })
    ''
    test("test #6 Delete email context", async () => 
    {
        const response: any = await fetch(
            BASE_URL+"/email-templates/"+emailTemplateDto['id'], 
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9'
                }
            }).catch(error => console.log(error))

        expect(response.ok).toBeTruthy()
    })

    test("test #7 Verify Email Context after was be deleted", async () => 
    {
        const response: any = await fetch(
        BASE_URL+"/email-context/"+emailTemplateDto['id'], 
        {
            method: 'GET',
            headers: {
                'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9'
            }
        }).catch(error => console.log(error))

        expect(response.ok).toBeFalsy()
    })

})