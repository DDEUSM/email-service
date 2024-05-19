import { EmailUseCases } from "../../../application/email-use-cases";
import { ApiError } from "../../server/http-server/api-error";
import { HttpResponse } from "../../server/http-server/http-response";
import { IHttpServer } from "../../server/http-server/http-server-interface";
import { Routes } from "../routes";

export class EmailRoutes extends Routes
{
    constructor (
        httpServer: IHttpServer,        
        public emailUseCases: EmailUseCases
    ){ super(httpServer)}

    initRoutes()
    {
        this.httpServer.controller (
            "get", "/email/:id", 
            (req, res, next ) => next(),
            async (req: any): Promise<HttpResponse> => 
            {
                const response = await this.emailUseCases.getEmailById(req.params.id)
                if (!response)
                {
                    throw new ApiError(404, "Menssagem de Email não encontrado!")
                }                     
                return new HttpResponse({
                    statusCode: 200, 
                    message: "Email template criado com sucesso!"
                })    
            }
        )

    }
}