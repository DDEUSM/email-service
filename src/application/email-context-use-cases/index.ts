import { EmailContext } from "../../domain/entities/email-context"
import { OutEmailContextDto, InEmailContextDto } from "../../infrastructure/dtos/context-dto"
import { ContextRepository } from "../../infrastructure/repositories/context-repository"
import { QueueMapType } from "../../init-queue"

export class EmailContextUseCases
{
    constructor (
        private contextRepository: ContextRepository,
        private queueJobs: QueueMapType
    ){}

    async save(emailContext: InEmailContextDto): Promise<void>
    {
        const newEmailContext = EmailContext.createContext(
            emailContext
        )
        await this.contextRepository.save(newEmailContext)
    }

    async findById(emailContextId: string): Promise<OutEmailContextDto | null>
    {
        return await this.contextRepository.findById(emailContextId)
    }

    async call(emailContextId: string, recipientData: any): Promise<any>
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

    async find(emailContextQuery: any, offset: number, limit: number): Promise<OutEmailContextDto[] | []>
    {
     
        return await this.contextRepository.find(emailContextQuery, offset, limit)
    }

    async update(emailContextId: string, emailContextUpdate: any): Promise<void>
    {
        await this.contextRepository.update(emailContextId, emailContextUpdate)
    }

    async delete(emailContextId: string): Promise<void>
    {
        await this.contextRepository.delete(emailContextId)
    }
}