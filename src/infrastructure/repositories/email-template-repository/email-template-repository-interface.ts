import { EmailTemplate } from "../../../domain/entities/email-template";
import { EmailTemplateDtoExtern } from "../../dtos/email-template";

export interface IEmailTemplateRepository
{
    save(emailTemplate: EmailTemplate): Promise<void>
    findById(emailTemplateId: string): Promise<EmailTemplateDtoExtern | null>
    find(emailTemplateQuery: any, offset: number, itensLimit: number): Promise<EmailTemplateDtoExtern[] | []>
    update(emailTemplateId: string, emailTemplate: any): Promise<void>
    delete(emailTemplateId: string): Promise<void>
}