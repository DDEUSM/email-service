import { EmailTemplate } from "../../domain/entities/email-template"
import { InEmailTemplateDto, OutEmailTemplateDto } from "../../infrastructure/dtos/email-template"
import { EmailTemplateRepository } from "../../infrastructure/repositories/email-template-repository"
import { QueueMapType } from "../../init-queue"

export class EmailTemplateUseCases
{
    constructor (
        private emailTemplateRepository: EmailTemplateRepository,
        private queueJobs: QueueMapType
    ){}

    async save(emailTemplate: InEmailTemplateDto): Promise<void>
    {
        const newEmailTemplate = EmailTemplate.createEmailTemplate(emailTemplate)
        await this.emailTemplateRepository.save(newEmailTemplate)
    }

    async findById(emailTemplateId: string): Promise<OutEmailTemplateDto | null>
    {
        return await this.emailTemplateRepository.findById(emailTemplateId)
    }

    async find(emailTemplateQuery: any, offset: number, limit: number): Promise<OutEmailTemplateDto[]>
    {
        return await this.emailTemplateRepository.find(emailTemplateQuery, offset, limit)
    }

    async update(emailTemplateId: string, emailTemplate: any): Promise<void>
    {
        await this.emailTemplateRepository.update(emailTemplateId, emailTemplate)
    }

    async delete(emailTemplateId: string): Promise<void>
    {
        await this.emailTemplateRepository.delete(emailTemplateId)
    }

}