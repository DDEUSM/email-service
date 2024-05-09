import { EmailTemplate } from "../../domain/entities/email-template"
import { User } from "../../domain/entities/user"
import { EmailTemplateRepository } from "../../infrastructure/repositories/email-template-repository"
import { QueueMapType } from "../../init-queue"

export class EmailTemplateUseCases
{
    constructor (
        private emailTemplateRepository: EmailTemplateRepository,
        private queueJobs: QueueMapType
    ){}

    async createEmailTemplate(emailTemplate: EmailTemplate): Promise<any>
    {
        await this.emailTemplateRepository.save(emailTemplate)
        return emailTemplate
    }

    async getEmailTemplateById(emailTemplateId: string): Promise<any>
    {
        return await this.emailTemplateRepository.findById(emailTemplateId)
    }

    async getEmailTemplates(emailTemplateQuery: any, offest: number, itensLimit: number): Promise<any>
    {
        return await this.emailTemplateRepository.find(emailTemplateQuery, offest, itensLimit)
    }

    async updateEmailTemplate(emailTemplateId: string, emailTemplate: any): Promise<void>
    {
        await this.emailTemplateRepository.update(emailTemplateId, emailTemplate)
    }

    async sendRegistrationMail(user: User): Promise<User>
    {                
        await this.queueJobs["RegistrationMail"].addJob({ user })        
        return user
    }

    async deleteEmailTemplate(emailTemplateId: string): Promise<void>
    {
        await this.emailTemplateRepository.delete(emailTemplateId)
    }

}