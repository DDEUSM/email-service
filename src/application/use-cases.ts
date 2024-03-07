import { JobQueue } from "../infrastructure/queue"
import { Email } from "../domain/entities/email";
import { User } from "../domain/entities/user";
import { UserRepository } from "../infrastructure/repositories/user-repository";
import { EmailRepository } from "../infrastructure/repositories/email-respository";
import smtpTransport from "../infrastructure/server/mail-server"
export class EmailUseCases
{
    constructor (
        private emailRepository: EmailRepository,
        private userRepository: UserRepository,
        private mailQueue: JobQueue
    ){}

    async sendEmail(email: Email): Promise<void>
    {
        await this.emailRepository.save(email)

        await smtpTransport.sendMail({
            date: email.sendDateEmail,
            from: `Email test < ${email.emailFrom} >`,
            to: ` < ${email.emailTo} >`,
            subject: email.subject,
            html: `<h1>${email.text}</h1>`
        })
        */
    }

    async sendRegistrationMail(user: User): Promise<User>
    {                
        await this.mailQueue.addJob({ user })        
        return user
    }
}