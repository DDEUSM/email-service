import { Email } from "../../domain/entities/email";
import { adaptDateToDb } from "../../utils/construct-query";
import { EmailDtoExtern, EmailDtoIntern} from "../dtos/email-dto";

export class EmailAdapter
{
    public static toDatabase(email: Email)
    {
        return {
            email_id: email.emailId,
            owner_id: email.ownerId,
            email_from: email.emailFrom,
            email_to: email.emailTo,
            subject: email.subject,
            text: email.html,
            send_date_email: adaptDateToDb(email.sendDateEmail),
            email_status: email.emailStatus
        }
    }

    public static toApplication(email: any): EmailDtoExtern
    {
        return new EmailDtoExtern (
            email.email_id,
            email.owner_id,
            email.email_from,
            email.email_to,
            email.subject,
            email.text,
            email.send_data_email,
            email.email_status
        )
    }

    public static toSmtp(email: any): any
    {
        /*
        return new EmailDtoSmtp (
            email.email_from,
            email.email_to,
            email.subject,
            email.html
        )
        */
    } 
}