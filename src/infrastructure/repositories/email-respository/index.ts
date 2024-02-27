import { Email } from "../../../domain/entities/email";
import { adaptDateToDb, generateQuery } from "../../../utils/construct-query";
import { IConnection } from "../../database/connection-interface";
import { EmailAdapter } from "../../interface-adapters";
import { IEmailRepository } from "./email-repository-interface";

export class EmailRepository implements IEmailRepository
{
    constructor (
        private dbConnection: IConnection
    ){}

    async save(email: Email): Promise<void> 
    {   
        const adaptedEmail = EmailAdapter.toDatabase(email)             
        const adaptedEmailValues = Object.values(adaptedEmail)
        const query = generateQuery(adaptedEmailValues, Object.keys(adaptedEmail))
        await this.dbConnection.query(query, adaptedEmailValues)        
    }
}
