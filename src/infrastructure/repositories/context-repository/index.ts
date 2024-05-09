import { EmailContext } from "../../../domain/entities/email-context";
import { GenerateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { EmailContextDtoExtern } from "../../dtos/context-dto";
import { EmailContextAdapter } from "../../interface-adapters/email-context-adapters";
import { IContextRepository } from "./context-repository-interface";

export class ContextRepository implements IContextRepository 
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save (emailContext: EmailContext): Promise<void> 
    {
        let adaptedContext = EmailContextAdapter.toDatabase(emailContext)
        let adaptedValues = Object.values(adaptedContext)
        const query = GenerateQuery.insert("contexts", adaptedContext)
        await this.dbConnection.query(query, adaptedValues)
    }

    async findById(emailContextId: string): Promise<EmailContextDtoExtern>
    {
        const query = GenerateQuery.query("contexts", { id: emailContextId })
        return await this.dbConnection.one(query, [emailContextId])
    }

    async find(emailContextQuery: {[key: string]: any}&{offset: number, itensLimit: number}): Promise<EmailContextDtoExtern[] | []> 
    {
        const adaptedData = EmailContextAdapter.adaptQueryStringToDb(emailContextQuery)
        const [offset, limit] = [adaptedData.offset, adaptedData.limit]
        delete adaptedData.offset; delete adaptedData.limit
        const values = Object.values(adaptedData)
        const query = GenerateQuery.query("contexts", adaptedData, offset, limit)
        return await this.dbConnection.query(query, values)
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
        const adaptedData = EmailContextAdapter.updateBody(updatedData)
        const values = Object.values(adaptedData)
        const updateQuery = GenerateQuery.updateOne("contexts", emailContextId, adaptedData)
        await this.dbConnection.query(updateQuery, [...values, emailContextId])
    }

    async delete(emailContextId: string): Promise<void> 
    {
        const deleteQuery = GenerateQuery.deleteOne("contexts")
        await this.dbConnection.query(deleteQuery, [emailContextId])
    }
}