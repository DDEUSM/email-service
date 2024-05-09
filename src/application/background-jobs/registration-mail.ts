import { IJob } from "./Job"
import smtpTransport from "../../infrastructure/server/mail-server"

export default class RegistrationMailJob implements IJob
{
    key = "RegistrationMail"
   
    async handle({ data })
    {                        
        const { user } = data
        console.log("handle User")
        console.log(user)
        await smtpTransport.sendMail({
            from: `Email test < no-reply@test.com >`,
            to: `${user.name} < ${user.email} >`,
            subject: "Testando filas",
            html: "<h1> TESTANDO FILAS PRIORITÁRIAS COM REDIS PARA BACKGROUND JOBS NO NODEJS</h1>"
        })        
    }    
}
