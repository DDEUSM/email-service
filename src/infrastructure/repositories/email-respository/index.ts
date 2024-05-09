import { Email } from "../../../domain/entities/email";
import { GenerateQuery} from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
import { EmailDtoExtern } from "../../dtos/email-dto";
import { EmailAdapter } from "../../interface-adapters/email-adapters";
import { IEmailRepository } from "./email-repository-interface";

export class EmailRepository implements IEmailRepository
{
    constructor (
        private dbConnection: ConnectionDatabase
    ){}

    async save(email: Email): Promise<void> 
    {   
        const adaptedEmail = EmailAdapter.toDatabase(email)             
        const adaptedEmailValues = Object.values(adaptedEmail)
        const query = GenerateQuery.insert("emails", adaptedEmail)
        await this.dbConnection.query(query, adaptedEmailValues)        
    }

    async getEmailById(emailId: string): Promise<EmailDtoExtern | null> 
    {
        const query = `SELECT * FROM emails WHERE email_id = $1`
        return await this.dbConnection.one(query, [emailId])
        .then(email => email? EmailAdapter.toApplication(email) : null)
    }

    async deleteEmail(emailId: string): Promise<EmailDtoExtern | null>
    {
        const foundedEmail = await this.getEmailById(emailId)
        const query = `DELETE FROM emails WHERE email_id = $1`
        await this.dbConnection.one(query, [emailId])
        return foundedEmail
    }
}
