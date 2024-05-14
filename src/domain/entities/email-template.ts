import { randomUUID } from "crypto";
import { InEmailTemplateDto } from "../../infrastructure/dtos/email-template";

export class EmailTemplate
{
    private constructor (
        public readonly id: string,
        public readonly projectId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string, 
    ){}

    public static createEmailTemplate (emailTemplateDto: InEmailTemplateDto): EmailTemplate | null
    {
        if (emailTemplateDto.subject.length > 100) {
            return null
        }
        return new EmailTemplate (
            randomUUID(),
            emailTemplateDto.projectId,
            emailTemplateDto.title, 
            emailTemplateDto.subject,
            emailTemplateDto.html,
        )
    }
}