import { randomUUID } from "crypto";
import { EmailTemplateDtoIntern } from "../../infrastructure/dtos/email-template";

export class EmailTemplate
{
    private constructor (
        public readonly id: string,
        public readonly ownerId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string, 
    ){}

    public static createEmailTemplate (emailTemplateDto: EmailTemplateDtoIntern): EmailTemplate | null
    {
        if (emailTemplateDto.subject.length > 100) {
            return null
        }
        return new EmailTemplate (
            randomUUID(),
            emailTemplateDto.ownerId,
            emailTemplateDto.title, 
            emailTemplateDto.subject,
            emailTemplateDto.html,
        )
    }
}