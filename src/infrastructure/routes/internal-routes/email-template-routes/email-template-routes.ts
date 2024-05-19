import { EmailTemplateUseCases } from "../../../../application/email-template-use-cases";
import { InEmailTemplateDto } from "../../../dtos/email-template";
import { HttpResponse } from "../../../server/http-server/http-response";
import { IHttpServer } from "../../../server/http-server/http-server-interface";
import { Routes } from "../../routes";

export class EmailTemplateRoutes extends Routes
{
    constructor (
        protected httpServer: IHttpServer,
        public emailTemplateUseCases: EmailTemplateUseCases
    ){ 
        super(httpServer)
        this.initRoutes()
    }

    public initRoutes(): void 
    {
        this.httpServer.controller("post", "/email-templates", 
        (req, res, next) => { next() },
        async (req) => 
        {
            const emailTemplateDto = new InEmailTemplateDto (
                req.body.projectId,
                req.body.title,
                req.body.subject,
                req.body.html
            )
            const result = await this.emailTemplateUseCases.save(emailTemplateDto)
            return new HttpResponse({
                statusCode: 201,
                message: "the new email template has been created!"
            })
        })


        this.httpServer.controller("get", "/email-templates", 
        (req, res, next) => { next() },
        async (req) => 
        {
            const result = await this.emailTemplateUseCases.find(req.query, Number(req.query.offset), Number(req.query.limit))
            return result.length?
                new HttpResponse({
                    statusCode: 200,
                    message: "The email templates have been founded!",
                    data: result
                })
            :
                new HttpResponse({
                    statusCode: 404,
                    message: "Email templates not founded!"
                })
        })


        this.httpServer.controller("get", "/email-templates/:id", 
        (req, res, next) => { next() },
        async (req) => 
        {
            const result = await this.emailTemplateUseCases.findById(req.params.id)
            return result?
                new HttpResponse({
                    statusCode: 200,
                    message: "The email template has been founded!",
                    data: result
                })
            :
                new HttpResponse({
                    statusCode: 404,
                    message: "Email template not founded!"
                })
        })


        this.httpServer.controller("put", "/email-templates/:id", 
        (req, res, next) => { next() },
        async (req) => 
        {
            await this.emailTemplateUseCases.update(req.params.id, req.body)
            return new HttpResponse({
                statusCode: 204,
                message: "The email template has been updated!"
            })
        })


        this.httpServer.controller("delete", "/email-templates/:id", 
        (req, res, next) => { next() },
        async (req) => 
        {
            await this.emailTemplateUseCases.delete(req.params.id)
            return new HttpResponse({
                statusCode: 200,
                message: "The email template has been deleted!"
            })
        })
    }
}