import { describe, expect, test } from "@jest/globals"
import { emailTemplateUseCases } from "../../init-connections"
import { EmailTemplate } from "../../domain/entities/email-template"
import { InEmailTemplateDto } from "../../infrastructure/dtos/email-template"


describe("test email templates", () => 
{
    const emailTemplateDto = new InEmailTemplateDto (
        '7e5fed81-77e0-4ca9-a05b-9c90492ca5eb',
        "email template de teste", 
        "email template for test",
        "</h1>i'am testing this feature</h1>"
    )
    let updateBody: any

    // npx jest ./src/application/email-template-use-cases/email-template-use-cases.spec.ts

    const emailTemplate = EmailTemplate.createEmailTemplate(emailTemplateDto)

    test("test #1 save email template | get it", async () => 
    {
        await emailTemplateUseCases.save(emailTemplate)

        let result: any = await emailTemplateUseCases.findById(emailTemplate.id)
        .catch(error => console.log(error))
        expect(result.id).toBe(emailTemplate.id)
    })

    test("test #2 update email template", async () => 
    {
        updateBody = {
            title: "Email template title 2.0"
        }
        await emailTemplateUseCases.update(emailTemplate.id, updateBody)
        .catch(error => console.log(error))
    })

    test("test #3 get updated email template", async () => 
    {
        const response = await emailTemplateUseCases.find({title: updateBody.title}, 0, 10)
        .catch(error => console.log(error))
        expect(response[0].title).toBe(updateBody.title)
    })

    test("test #4 delete him | verify if it has deleted", async () => 
    {
        await emailTemplateUseCases.delete(emailTemplate.id);
        let result2 = await emailTemplateUseCases.findById(emailTemplate.id)
        .catch(error => { return error } ) 

        expect(result2.message).toBe("No data returned from the query.")
    })

})