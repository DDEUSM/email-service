import { EmailTemplate } from "../../domain/entities/email-template";
import { EmailTemplateSchema } from "../schemas/email-template";
import { Adapter } from "./adapter";

type EmailTemplateUpdateObject = {
    projectId: string
    title: string
    subject: string
    html: string
}

export class EmailTemplateAdapter extends Adapter
{
    public static entityToDatabase(emailTemplate: EmailTemplate): EmailTemplateSchema
    {
        return {
            id: emailTemplate.id,
            project_id: emailTemplate.projectId,
            title: emailTemplate.title,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
        } as EmailTemplateSchema
    }

    public static updateBodyToDatabase(emailTemplateUpdateObject: EmailTemplateUpdateObject)
    {
        const updateObject: EmailTemplateUpdateObject = {
            projectId: emailTemplateUpdateObject.projectId,
            title: emailTemplateUpdateObject.title,
            subject: emailTemplateUpdateObject.subject,
            html: emailTemplateUpdateObject.html
        }
        return EmailTemplateAdapter.clearObject(updateObject)
    }

    public static queryToDatabase(emailTemplateQuery: any)
    {   
        let object = {
            project_id: emailTemplateQuery.projectId,
            title: emailTemplateQuery.title,
            subject: emailTemplateQuery.subject,
            html: emailTemplateQuery.html,
            created_at: emailTemplateQuery.createdAt
        }
        return EmailTemplateAdapter.clearObject(object)
    }
}