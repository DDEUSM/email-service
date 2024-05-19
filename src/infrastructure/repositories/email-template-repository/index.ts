import { EmailTemplate } from "../../../domain/entities/email-template";
import { GenerateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { OutEmailTemplateDto } from "../../dtos/email-template";
import { EmailTemplateAdapter } from "../../interface-adapters/email-template-adapters";
import { EmailTemplateSchema } from "../../schemas/email-template";
import { IEmailTemplateRepository } from "./email-template-repository-interface";

export class EmailTemplateRepository implements IEmailTemplateRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save(emailTemplate: EmailTemplate): Promise<void> 
    {
        const adaptedEmailTemplate = EmailTemplateAdapter.entityToDatabase(emailTemplate)             
        const insert = GenerateQuery.insert("emailtemplates", Object.keys(adaptedEmailTemplate))
        await this.dbConnection.query(insert, Object.values(adaptedEmailTemplate))        
    }

    async findById(emailTemplateId: string): Promise<OutEmailTemplateDto | null> 
    {
        const query = GenerateQuery.query("emailtemplates", ["id"])
        const result: EmailTemplateSchema = await this.dbConnection.one(query, [emailTemplateId])
        
        return result? 
            new OutEmailTemplateDto (
                result.id,
                result.project_id,
                result.title,
                result.subject,
                result.html,
                result.created_at
            )
        :
            null
    }

    async find(emailTemplateQuery: any, offset: number, limit: number): Promise<OutEmailTemplateDto[]> 
    {
        const adaptedEmailTemplateQuery = EmailTemplateAdapter.queryToDatabase(emailTemplateQuery)
        const query = GenerateQuery.query("emailtemplates", Object.keys(adaptedEmailTemplateQuery), offset, limit)
        const result: EmailTemplateSchema[] = await this.dbConnection.query(query, Object.values(adaptedEmailTemplateQuery))
      
        return result.length? 
            result.map(emailTemplate => (
                new OutEmailTemplateDto (
                    emailTemplate.id,
                    emailTemplate.project_id,
                    emailTemplate.title,
                    emailTemplate.subject,
                    emailTemplate.html,
                    emailTemplate.created_at
                )
            ))
        :
            []
    }

    async update(emailTemplateId: string, emailTemplate: any): Promise<void> 
    {
        const adaptedEmailTemplate = EmailTemplateAdapter.queryToDatabase(emailTemplate)
        const query = GenerateQuery.updateOne("emailtemplates", emailTemplateId, Object.keys(adaptedEmailTemplate))
        await this.dbConnection.query(query, Object.values(adaptedEmailTemplate))
    }

    async delete(emailTemplateId: string): Promise<void> 
    {
        let deleteQuery = GenerateQuery.deleteOne("emailtemplates")
        await this.dbConnection.query(deleteQuery, [emailTemplateId])
    }
}