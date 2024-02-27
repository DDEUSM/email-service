import { EmailUseCases } from "../../application/use-cases";
import { Email } from "../../domain/entities/email";
import { ValidateBody } from "../middleware/validate-body";
import { HttpResponse } from "../server/http-server/http-response";
import { IHttpServer } from "../server/http-server/http-server-interface";

export class EmailRoutes
{
    constructor (
        public httpServer: IHttpServer,
        public emailUseCases: EmailUseCases
    ){}

    initRoutes()
    {
        this.httpServer.add (
            "post", "/send-email", ValidateBody.validateEmail,
            async (req: any): Promise<HttpResponse> => 
            {
                const newEmail = Email.createEmail(req.emailDto)
                await this.emailUseCases.sendEmail(newEmail)
                return new HttpResponse(200,"Email enviado com sucesso")
            }
        )
    }
}