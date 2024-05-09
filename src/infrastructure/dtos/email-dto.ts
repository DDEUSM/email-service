import { StatusEmail } from "../../domain/enums/email-enum";

export class EmailDtoIntern
{
    constructor (
        public readonly ownerId: string,
        public readonly emailFrom: string,
        public readonly emailTo: string,
        public readonly subject: string,
        public readonly html: string,        
    ){}
}

export class EmailDtoExtern
{
    constructor (
        public emailId: string,
        public ownerId: string,
        public emailFrom: string,
        public emailTo: string,
        public subject: string,
        public html: string,  
        public readonly sendDateEmail: Date,
        public readonly emailStatus: StatusEmail
    ){}
}
