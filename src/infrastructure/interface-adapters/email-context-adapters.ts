import { EmailContext } from "../../domain/entities/email-context";
import { EmailContextSchema } from "../schemas/email-context";
import { Adapter } from "./adapter";

type EmailContextUpdateObject = {
    title?: string
    emailFrom?: string
    emailTemplateId?: string  
}

export class EmailContextAdapter extends Adapter
{
    public static entityToDatabase(emailContext: EmailContext): EmailContextSchema
    {
        return {
           id: emailContext.id,
           project_id: emailContext.projectId,
           email_template_id: emailContext.emailTemplateId,
           email_from: emailContext.emailFrom,
           title: emailContext.title
        }
    }

    public static updateBodyToDatabase(emailContextUpdateObject: any): EmailContextUpdateObject
    {
        let updateObject: EmailContextUpdateObject = {
            title: emailContextUpdateObject.title,
            emailFrom: emailContextUpdateObject.emailFrom,
            emailTemplateId: emailContextUpdateObject.emailTemplateId
        }
       return EmailContextAdapter.clearObject(updateObject)
    }

    public static queryToDatabase(emailContextQuery: {[key: string]: any}): any
    {
        let object = {
            id: emailContextQuery.id,
            project_id: emailContextQuery.projectId,
            email_template_id: emailContextQuery.emailTemplateId,
            email_from: emailContextQuery.emailFrom,
            title: emailContextQuery.title
        }
        return EmailContextAdapter.clearObject(object)
    }
}