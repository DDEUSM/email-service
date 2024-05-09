import axios from "axios"
import { host, port } from "../../../../env"

describe("email context routes test", () => 
{
    const BASE_URL = `http://${host}:${port}`
    let emailContextFinal: any
    const updateBody = {
        title: "New title 2.0 to context email"
    }

    const emailContext = {
        projectId: '7e5fed81-77e0-4ca9-a05b-9c90492ca5eb',
        emailTemplateId: '307a391e-d532-4eed-a0e2-3309c97f4111',
        emailFrom: "daviddeus@gmail.com",
        title: "New Email context"
    }
    
    test("test #1 Create email context", async () => 
    {
        const response: any = await axios.post (
            BASE_URL+"/email-context",
            emailContext,
            {
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9',
                    'Content-Type': 'application/json'
                }
            }
        ).catch(error => console.log(error))
    })
    
    test("test #2 Get email context", async () => 
    {
        const response: any = await axios.get(
            BASE_URL+"/email-context?title="+emailContext.title+"&offset=0&itensLimit=10", {
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9'
                }
            }
        )
        .catch(error => console.log(error))

        emailContextFinal = response.data[0]        
        expect(response.data[0].title).toBe(emailContext.title)
        expect(response.data[0].project_id).toBe(emailContext.projectId)
    })

    test("test #3 update email context", async () => 
    {
        const response = await axios.put(
            BASE_URL+"/email-context/"+emailContextFinal.id,
            updateBody
        )
    })
    // npx jest ./src/infrastructure/routes/internal-routes/email-context-routes/email-context-routes.spec.ts 
  
    test("test #4 Call email context", async () => 
    {
        const postBody = {
            recipientData: {
                firstName: "Dario de Deus Mesquita",
                email: "dario@gmail.com"
            }
        } 
        
        const response = await axios.post(BASE_URL+"/call-email-context/"+emailContextFinal.id, 
            postBody,
            {
                headers: {
                    'Authorization': "API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9",
                    'Content-Type': "application/json" 
                },
            }
        )
    })

    test("test #5 Verify email context after update", async () => 
        {
            const response = await axios.get(
                BASE_URL+"/email-context/"+emailContextFinal.id, 
            )

            expect(response.data.title).toBe(updateBody.title)
            expect(response.data.id).toBe(emailContextFinal.id)
        })
    ''
    test("test #6 Delete email context", async () => 
    {
        const response = await fetch(
            BASE_URL+"/email-context/"+emailContextFinal.id, 
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'API_KEY b0b77de101e00?4d4e%8652%b6527fe4b0d9'
                }
            }).catch(error => console.log(error))

        console.log(response)
    })

})