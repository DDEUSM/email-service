import { EmailDtoIntern } from "../../infrastructure/dtos/email-dto";
import { StatusEmail } from "../enums/email-enum";

export class Email
{
    private constructor (
        public readonly emailId: string,    
        public readonly ownerId: string,
        public readonly emailFrom: string,
        public readonly emailTo: string,
        public readonly subject: string,
        public readonly html: string,
        public readonly sendDateEmail: Date,
        public readonly emailStatus: StatusEmail
    ){}

    static createEmail(emailDto: EmailDtoIntern)
    {
        return new Email(
            crypto.randomUUID(),
            emailDto.ownerId,
            emailDto.emailFrom,
            emailDto.emailTo,
            emailDto.subject,
            emailDto.html,
            new Date(),
            StatusEmail.sent
        )
    }
}