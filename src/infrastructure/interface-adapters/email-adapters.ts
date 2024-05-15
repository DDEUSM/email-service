import { Email } from "../../domain/entities/email";
import { adaptDateToDb } from "../../utils/construct-query";
import { EmailDtoExtern, EmailDtoIntern} from "../dtos/email-dto";
import { Adapter } from "./adapter";

export class EmailAdapter extends Adapter
{
    public entityToDatabase(any: any) {
        return {
            email_id: any.emailId,
            owner_id: any.ownerId,
            email_from: any.emailFrom,
            email_to: any.emailTo,
            subject: any.subject,
            text: any.html,
            send_date_email: adaptDateToDb(any.sendDateEmail),
            email_status: any.emailStatus
        }
    }

    public static queryToDatabase(any: any) {
        return
    }

    public updateBodyToDatabase(any: any) {
        return
    }



}