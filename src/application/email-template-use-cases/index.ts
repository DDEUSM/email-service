import { EmailTemplate } from "../../domain/entities/email-template"
import { OutEmailTemplateDto } from "../../infrastructure/dtos/email-template"
import { EmailTemplateRepository } from "../../infrastructure/repositories/email-template-repository"
import { QueueMapType } from "../../init-queue"

export class EmailTemplateUseCases
{
    constructor (
        private emailTemplateRepository: EmailTemplateRepository,
        private queueJobs: QueueMapType
    ){}

    async save(emailTemplate: EmailTemplate): Promise<any>
    {
        await this.emailTemplateRepository.save(emailTemplate)
        return emailTemplate
    }

    async findById(emailTemplateId: string): Promise<OutEmailTemplateDto | null>
    {
        return await this.emailTemplateRepository.findById(emailTemplateId)
    }

    async find(emailTemplateQuery: any, offset: number, limit: number): Promise<[] | OutEmailTemplateDto[]>
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