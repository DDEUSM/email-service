import { Job } from "./Job"
import smtpTransport from "../../infrastructure/server/mail-server"
export class RegistrationMailJob extends Job
{
    key = "RegistrationMail"
 
    constructor()
    {
        super()        
    }
   
    async handle({ data })
    {                        
        const { user } = data
        await smtpTransport.sendMail({
            from: `Email test < no-reply@test.com >`,
            to: `${user.name} < ${user.email} >`,
            subject: "Testando filas",
            html: "<h1> TESTANDO FILAS PRIORITÁRIAS COM REDIS PARA BACKGROUND JOBS NO NODEJS</h1>"
        })        
    }    
}
