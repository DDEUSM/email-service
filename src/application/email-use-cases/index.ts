import { Email } from "../../domain/entities/email"
import { User } from "../../domain/entities/user"
import { EmailDtoExtern, EmailDtoIntern } from "../../infrastructure/dtos/email-dto"
import { EmailRepository } from "../../infrastructure/repositories/email-respository"
import { QueueMapType } from "../../init-queue"

export class EmailUseCases
{
    constructor (
        private emailRepository: EmailRepository,
        private queueJobs: QueueMapType
    ){}

    async createEmail(emailDto: EmailDtoIntern): Promise<void>
    {
        const neweEmail = Email.createEmail(emailDto)
        await this.emailRepository.save(neweEmail)
    }

    async getEmailById(emailId: string): Promise<EmailDtoExtern | null>
    {
        return await this.emailRepository.getEmailById(emailId)
    }

    async sendRegistrationMail(user: User): Promise<User>
    {                
        await this.queueJobs["RegistrationMail"].addJob({ user })        
        return user
    }

}