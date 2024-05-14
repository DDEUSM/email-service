import { EmailTemplate } from "../../../domain/entities/email-template";
import { OutEmailTemplateDto } from "../../dtos/email-template";

export interface IEmailTemplateRepository
{
    save(emailTemplate: EmailTemplate): Promise<void>
    findById(emailTemplateId: string): Promise<OutEmailTemplateDto | null>
    find(emailTemplateQuery: any, offset: number, limit: number): Promise<OutEmailTemplateDto[] | []>
    update(emailTemplateId: string, emailTemplate: any): Promise<void>
    delete(emailTemplateId: string): Promise<void>
}