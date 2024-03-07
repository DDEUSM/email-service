import { Email } from "../../domain/entities/email";
import { StatusEmail } from "../../domain/enums/email-enum";
import { adaptDateToDb } from "../../utils/construct-query";

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
            text: email.text,
            send_date_email: adaptDateToDb(email.sendDateEmail),
            email_status: email.emailStatus
        }
    }
}