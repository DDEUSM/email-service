import { EmailContext } from "../../domain/entities/email-context";

type EmailContextUpdateObject = {
    title?: string
    emailFrom?: string
    emailTemplateId?: string  
}

export class EmailContextAdapter
{
    public static toDatabase(emailContext: EmailContext): any
    {
        return {
           id: emailContext.id,
           project_id: emailContext.projectId,
           email_template_id: emailContext.emailTemplateId,
           email_from: emailContext.emailFrom,
           title: emailContext.title
        }
    }

    private static clearObject(object: any)
    {
        return Object.keys(object).reduce((finalObject: any, key: any, index: number) => 
        {
            object[key] || typeof object[key] === 'number'? finalObject[key] = object[key] : null
            return finalObject
        }, {})
    }

    public static updateBody(emailContextUpdateObject: EmailContextUpdateObject): any
    {
        let updateObject: EmailContextUpdateObject = {
            title: emailContextUpdateObject.title,
            emailFrom: emailContextUpdateObject.emailFrom,
            emailTemplateId: emailContextUpdateObject.emailTemplateId
        }
       return EmailContextAdapter.clearObject(updateObject)
    }

    public static adaptQueryStringToDb(emailContextQuery: {[key: string]: any}&{offset: number, itensLimit: number}): any
    {
        let object = {
            id: emailContextQuery.id,
            project_id: emailContextQuery.projectId,
            email_template_id: emailContextQuery.emailTemplateId,
            email_from: emailContextQuery.emailFrom,
            title: emailContextQuery.title,
            offset: emailContextQuery.offset,
            limit: emailContextQuery.itensLimit
        }
        return EmailContextAdapter.clearObject(object)
    }
}