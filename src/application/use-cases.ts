import e from "express";
import { Email } from "../domain/entities/email";

export class EmailUseCases
{
    constructor (
        private emailRepository: any,
        private smtpTransport: any
    ){}

    async sendEmail(email: Email): Promise<void>
    {
        await this.emailRepository.save(email)

        await this.smtpTransport.sendMail({
            from: `Email test <${email.emailFrom}>`,
            to: `< ${email.emailTo}>`,
            subject: email.subject,
            html: email.text
        })
    }
}