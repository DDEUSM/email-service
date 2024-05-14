import { EmailContextUseCases } from "../../../../application/email-context-use-cases";
import { ProjectAuthHandler } from "../../../middleware/auth-handler";
import { HttpResponse } from "../../../server/http-server/http-response";
import { IHttpServer } from "../../../server/http-server/http-server-interface";
import { Routes } from "../../routes";

export class ExternalServiceRoutes extends Routes
{
    constructor (
        httpServer: IHttpServer,
        public contextUseCase: EmailContextUseCases
    ){ super(httpServer) }

    initRoutes()
    {
        this.httpServer.add("post", "/call-email-context/:id", 
        ProjectAuthHandler.projectAuth,
            async (req: any) => 
            {
                const response = await this.contextUseCase.call (
                    req.params.id, 
                    req.body.recipientData
                )
                return new HttpResponse({
                    statusCode: 200
                })
            }            
        )
    }

}