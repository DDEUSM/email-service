import { EmailContext } from "../../domain/entities/email-context"
import { EmailContextDtoExtern, EmailContextDtoIntern } from "../../infrastructure/dtos/context-dto"
import { ContextRepository } from "../../infrastructure/repositories/context-repository"
import { QueueMapType } from "../../init-queue"

export class EmailContextUseCases
{
    constructor (
        private contextRepository: ContextRepository,
        private queueJobs: QueueMapType
    ){}

    async createEmailContext(emailContext: EmailContextDtoIntern): Promise<void>
    {
        const newEmailContext = EmailContext.createContext(
            emailContext
        )
        await this.contextRepository.save(newEmailContext)
    }

    async getEmailContextById(emailContextId: string): Promise<EmailContextDtoExtern | null>
    {
        return await this.contextRepository.findById(emailContextId)
    }

    async callEmailContext(emailContextId: string, recipientData: any): Promise<any>
    {
        const emailTemplate = await this.contextRepository.findContextRelations(emailContextId)
        const email = {
            from: `Email test <${emailTemplate.email_from}>`,
            to: `${recipientData.firstName} <${recipientData.email}>`,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        }
        this.queueJobs["SendMail"].addJob({ email })
    }

    async getEmailContexts(emailContextQuery: any): Promise<EmailContextDtoExtern[] | []>
    {
        const emailContextQueryAdapted = {
            ...emailContextQuery, 
            offset: Number(emailContextQuery.offset), 
            itensLimit: Number(emailContextQuery.itensLimit)
        }
        return await this.contextRepository.find(emailContextQueryAdapted)
    }

    async updateEmailContext(emailContextId: string, emailContextUpdate: any): Promise<void>
    {
        await this.contextRepository.update(emailContextId, emailContextUpdate)
    }

    async deleteEmailContext(emailContextId: string): Promise<void>
    {
        await this.contextRepository.delete(emailContextId)
    }
}