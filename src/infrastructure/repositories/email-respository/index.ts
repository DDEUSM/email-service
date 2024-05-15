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
            
    }

    async getEmailById(emailId: string): Promise<EmailDtoExtern | null> 
    {
       return
    }
''
    async deleteEmail(emailId: string): Promise<EmailDtoExtern | null>
    {
       return
    }
}
