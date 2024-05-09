import { EmailContextUseCases } from "../../../../application/email-context-use-cases";
import { EmailContextDtoIntern } from "../../../dtos/context-dto";
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
            const response = await this.contextUseCase.getEmailContextById(req.params.id)
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
        async (req: any): Promise<HttpResponse> => {
            const response = await this.contextUseCase.getEmailContexts(req.query)
            return new HttpResponse({
                statusCode: 200,
                data: response
            })
        })

        this.httpServer.add("post", "/email-context", 
        (req, res, next) => {next()}, 
        async (req: any) => {
            const emailContextDto = new EmailContextDtoIntern (
                req.body.projectId,
                req.body.emailTemplateId,
                req.body.emailFrom,
                req.body.title
            )
            await this.contextUseCase.createEmailContext(emailContextDto)
            return new HttpResponse({
                statusCode: 201,
                message: "New Context has been Created!"
            })
        })

        this.httpServer.add("put", "/email-context/:id", 
            (req, res, next) => {next()},
            async (req: any) => {
                await this.contextUseCase.updateEmailContext(req.params.id, req.body)
                return new HttpResponse({
                    statusCode: 204
                })
            }
        )

        this.httpServer.add("post", "/call-email-context/:id", 
        (req, res, next) => {next()},
            async (req: any) => {
                const response = await this.contextUseCase.callEmailContext (
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
            async (req: any) => {
                await this.contextUseCase.deleteEmailContext (
                    req.params.id
                )
                return new HttpResponse({
                    statusCode: 200
                })
            }
        )
    }

}