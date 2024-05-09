import { EmailTemplate } from "../../domain/entities/email-template";

export class EmailTemplateAdapter
{
    public static toDatabase(emailTemplate: EmailTemplate)
    {
        return {
            id: emailTemplate.id,
            owner_id: emailTemplate.ownerId,
            title: emailTemplate.title,
            subject: emailTemplate.subject,
            html: emailTemplate.html,
        }
    }

    public static queryToDatabase(emailTemplateQuery: any)
    {   
        let object = {
            owner_id: emailTemplateQuery.ownerId,
            title: emailTemplateQuery.title,
            subject: emailTemplateQuery.subject,
            html: emailTemplateQuery.html,
            created_at: emailTemplateQuery.createdAt
        }
        return Object.keys(object).reduce((finalQueryObj: any, currentKey: any, index: number) => 
        {
            object[currentKey]? finalQueryObj[currentKey] = object[currentKey] : null
            return finalQueryObj 
        }, {})
    }
}