import { EmailContextUseCases } from "../../../../application/email-context-use-cases";
import { InEmailContextDto } from "../../../dtos/context-dto";
import { HttpResponse } from "../../../server/http-server/http-response";
import { IHttpServer } from "../../../server/http-server/http-server-interface";
import { Routes } from "../../routes";

export class ContextRoutes extends Routes
{
    constructor (
        httpServer: IHttpServer,
        public contextUseCase: EmailContextUseCases
    ){ super(httpServer) }

    initRoutes()
    {
        this.httpServer.add("get", "/email-context/:id", 
        (req, res, next) => {next()}, 
        async (req: any): Promise<HttpResponse> => {
            const response = await this.contextUseCase.findById(req.params.id)
            if (!response)
            {
                return new HttpResponse({ 
                    statusCode: 404,
                    message: "Context não encontrado!"
                })
            }                     
            return new HttpResponse({
                statusCode: 200,
                data: response
            })
        })

        this.httpServer.add("get", "/email-context", 
        (req, res, next) => {next()},
        async (req: any): Promise<HttpResponse> => 
        {
            const [offset, limit] = [ Number(req.query.offset), Number(req.query.itensLimit)]
            const response = await this.contextUseCase.find(req.query, offset, limit)
            return new HttpResponse({
                statusCode: 200,
                data: response
            })
        })

        this.httpServer.add("post", "/email-context", 
        (req, res, next) => {next()}, 
        async (req: any) => {
            const emailContextDto = new InEmailContextDto (
                req.body.projectId,
                req.body.emailTemplateId,
                req.body.emailFrom,
                req.body.title
            )
            await this.contextUseCase.save(emailContextDto)
            return new HttpResponse({
                statusCode: 201,
                message: "New Context has been Created!"
            })
        })

        this.httpServer.add("put", "/email-context/:id", 
            (req, res, next) => {next()},
            async (req: any) => 
            {
                await this.contextUseCase.update(req.params.id, req.body)
                return new HttpResponse({
                    statusCode: 204
                })
            }
        )

        this.httpServer.add("post", "/call-email-context/:id", 
        (req, res, next) => {next()},
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

        this.httpServer.add("delete", "/email-context/:id", 
        (req, res, next) => {next()},
            async (req: any) => 
            {
                await this.contextUseCase.delete (
                    req.params.id
                )
                return new HttpResponse({
                    statusCode: 200
                })
            }
        )
    }

}