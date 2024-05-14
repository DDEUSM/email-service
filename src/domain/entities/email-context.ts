import { randomUUID } from "crypto"
import { InEmailContextDto } from "../../infrastructure/dtos/context-dto"

export class EmailContext 
{
    private constructor (
        readonly id: string,
        readonly projectId: string,
        readonly emailTemplateId: string,
        readonly emailFrom: string,
        readonly title: string,
        readonly createdAt: number
    ){}

    public static createContext(EmailcontextDtoIntern: InEmailContextDto)
    {
        if (!EmailcontextDtoIntern) return null
        return new EmailContext (
            randomUUID(),
            EmailcontextDtoIntern.projectId,
            EmailcontextDtoIntern.emailTemplateId,
            EmailcontextDtoIntern.emailFrom,
            EmailcontextDtoIntern.title,
            Date.now()
        )
    }

}