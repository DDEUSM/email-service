import { EmailContext } from "../../../domain/entities/email-context";
import { GenerateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { OutEmailContextDto } from "../../dtos/context-dto";
import { EmailContextAdapter } from "../../interface-adapters/email-context-adapters";
import { EmailContextSchema } from "../../schemas/email-context";
import { IContextRepository } from "./context-repository-interface";

export class ContextRepository implements IContextRepository 
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save (emailContext: EmailContext): Promise<void> 
    {
        let adaptedContext = EmailContextAdapter.entityToDatabase(emailContext)
        const query = GenerateQuery.insert("contexts", Object.keys(adaptedContext))
        await this.dbConnection.query(query, Object.values(adaptedContext))
    }

    async findById(emailContextId: string): Promise<OutEmailContextDto>
    {
        const query = GenerateQuery.query("contexts", ["id"])
        const foundedEmailContext: EmailContextSchema = await this.dbConnection.one(query, [emailContextId])

        return new OutEmailContextDto (
            foundedEmailContext.id,
            foundedEmailContext.project_id,
            foundedEmailContext.email_template_id,
            foundedEmailContext.email_from,
            foundedEmailContext.title,
            foundedEmailContext.created_at
        )
    }

    async find(emailContextQuery: any, offset: number, limit: number): Promise<OutEmailContextDto[] | []> 
    {
        const adaptedData = EmailContextAdapter.queryToDatabase(emailContextQuery)
        const query = GenerateQuery.query("contexts", Object.keys(adaptedData), offset, limit)
        const foundedEmailContexts: EmailContextSchema[] = await this.dbConnection.query(query, Object.values(adaptedData))

        if (!foundedEmailContexts.length)
        {
            return []
        }
        
        return foundedEmailContexts.map(context => new OutEmailContextDto (
            context.id,
            context.project_id,
            context.email_template_id,
            context.email_from,
            context.title,
            context.created_at
        ))
    }

    async findContextRelations(emailContextId: string): Promise<any> 
    {
        console.log("email-context-id")
        console.log(emailContextId)
        const joinQuery = `SELECT email_from, subject, html FROM contexts JOIN emailtemplates ON contexts.email_template_id = emailtemplates.id WHERE contexts.id = $1;`
        return await this.dbConnection.one(joinQuery, [emailContextId]) 
    }

    async update (emailContextId: string, updatedData: any): Promise<void> 
    {
        const adaptedData = EmailContextAdapter.updateBodyToDatabase(updatedData)
        const updateQuery = GenerateQuery.updateOne("contexts", emailContextId, Object.keys(adaptedData))
        await this.dbConnection.query(updateQuery, Object.values(adaptedData))    
    }

    async delete(emailContextId: string): Promise<void> 
    {
        const deleteQuery = GenerateQuery.deleteOne("contexts")
        await this.dbConnection.query(deleteQuery, [emailContextId])
    }
}