import smtpTransport from "../../infrastructure/server/mail-server"
import { IJob } from "./Job";
import { Email } from "../../domain/entities/email";

export default class SendMailJob implements IJob
{
    key = "SendMail";

    async handle({ data }): Promise<any> 
    {
        const { email } = data
        console.log("handle Email")
        console.log(email)
        await smtpTransport.sendMail({
            from: email.from,
            to: email.to,
            subject: email.subject,
            html: email.html
        })        
    }
}