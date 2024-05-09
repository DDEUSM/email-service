import { EmailTemplate } from "../../../domain/entities/email-template";
import { GenerateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { EmailTemplateDtoExtern } from "../../dtos/email-template";
import { EmailTemplateAdapter } from "../../interface-adapters/email-template-adapters";
import { IEmailTemplateRepository } from "./email-template-repository-interface";

export class EmailTemplateRepository implements IEmailTemplateRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save(emailTemplate: EmailTemplate): Promise<void> 
    {
        const adaptedEmailTemplate = EmailTemplateAdapter.toDatabase(emailTemplate)             
        const adaptedEmailTemplateValues = Object.values(adaptedEmailTemplate)
        const insert = GenerateQuery.insert("emailtemplates", adaptedEmailTemplate)
        await this.dbConnection.query(insert, adaptedEmailTemplateValues)        
    }

    async findById(emailTemplateId: string): Promise<EmailTemplateDtoExtern | null> 
    {
        const query = GenerateQuery.query("emailtemplates", { id: emailTemplateId })
        const result = await this.dbConnection.one(query, emailTemplateId)
        return new EmailTemplateDtoExtern (
            result.id,
            result.owner_id,
            result.title,
            result.subject,
            result.html,
            result.created_at
        )
    }

    async find(emailTemplateQuery: any, offset: number, itensLimit: number): Promise<EmailTemplateDtoExtern[] | []> 
    {
        const adaptedEmailTemplateQuery = EmailTemplateAdapter.queryToDatabase(emailTemplateQuery)
        const values = Object.values(adaptedEmailTemplateQuery)
        const query = GenerateQuery.query("emailtemplates", adaptedEmailTemplateQuery)
        const result = await this.dbConnection.query(query, values)
        if (!result.length)
        {
            return []
        }
        return result.map(emailTemplate => (
            new EmailTemplateDtoExtern (
                emailTemplate.id,
                emailTemplate.owner_id,
                emailTemplate.title,
                emailTemplate.subject,
                emailTemplate.html,
                emailTemplate.created_at
            )
        ))
    }

    async update(emailTemplateId: string, emailTemplate: any): Promise<void> 
    {
        const adaptedEmailTemplate = EmailTemplateAdapter.queryToDatabase(emailTemplate)
        const values = Object.values(adaptedEmailTemplate)
        const query = GenerateQuery.updateOne("emailtemplates", emailTemplateId, adaptedEmailTemplate)
        await this.dbConnection.one(query, values)
    }

    async delete(emailTemplateId: string): Promise<void> 
    {
        let deleteQuery = GenerateQuery.deleteOne("emailtemplates")
        await this.dbConnection.query(deleteQuery, [emailTemplateId])
    }
}