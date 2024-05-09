import { Email } from "../../../domain/entities/email";
import { EmailDtoExtern } from "../../dtos/email-dto";

export interface IEmailRepository
{
    save(email: Email): Promise<void>
    getEmailById(emailId: string): Promise<EmailDtoExtern | null>
}