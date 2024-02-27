import { Email } from "../../../domain/entities/email";

export interface IEmailRepository
{
    save(email: Email): Promise<void>
}