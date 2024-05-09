import { describe, expect, test } from "@jest/globals"
import { emailTemplateUseCases } from "../../init-connections"
import { EmailTemplate } from "../../domain/entities/email-template"
import { EmailTemplateDtoIntern } from "../../infrastructure/dtos/email-template"

describe("test email templates", () => 
{
    const emailTemplateDto = new EmailTemplateDtoIntern (
        '303a391e-d532-4eed-a0e2-3309c97f4d21',
        "email template de teste", 
        "email template for test",
        "</h1>i'am testing this feature</h1>",
    )

    const emailTemplate = EmailTemplate.createEmailTemplate(emailTemplateDto)

    test("save email template | get it", async () => 
    {
        await emailTemplateUseCases.createEmailTemplate(emailTemplate)
        
        let result = await emailTemplateUseCases.getEmailTemplateById(emailTemplate.id) 
        expect(result.id).toBe(emailTemplate.id)

    })
    
    test("delete him | verify if it has deleted", async () => 
    {
        await emailTemplateUseCases.deleteEmailTemplate(emailTemplate.id);

        let result2 = await emailTemplateUseCases.getEmailTemplateById(emailTemplate.id)
        .catch(error => { return console.log(error) } ) 
    })
})