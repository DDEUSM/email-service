import { Email } from "../../../domain/entities/email";
import { adaptDateToDb, generateQuery } from "../../../utils/construct-query";
import { ConnectionDatabase } from "../../database/connection-interface";
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
        const query = generateQuery(adaptedEmail, "emails")
        await this.dbConnection.query(query, adaptedEmailValues)        
    }
}
