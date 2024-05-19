import { ProjectUseCases } from "../../../../application/project-use-cases"
import { InProjectDto } from "../../../dtos/project-dto"
import { HttpResponse } from "../../../server/http-server/http-response"
import { IHttpServer } from "../../../server/http-server/http-server-interface"
import { Routes } from "../../routes"


export class ProjectRoutes extends Routes
{
    constructor (
        httpServer: IHttpServer,
        public projectUseCases: ProjectUseCases
    ){ 
        super(httpServer)
        this.initRoutes() 
    }

    initRoutes()
    {
        this.httpServer.controller("get", "/projects/:id", 
        (req, res, next) => {next()}, 
        async (req: any): Promise<HttpResponse> => 
        {
            const response = await this.projectUseCases.findById(req.params.id)

            return response?
                new HttpResponse({
                    statusCode: 200,
                    data: response
                })
            :
                new HttpResponse({ 
                    statusCode: 404,
                    message: "Projeto não encontrado!"
                })
        })

        this.httpServer.controller("get", "/projects", 
        (req, res, next) => {next()},
        async (req: any): Promise<HttpResponse> => 
        {
            const [offset, limit] = [ Number(req.query.offset), Number(req.query.limit)]
            const response = await this.projectUseCases.find(req.query, offset, limit)
            return new HttpResponse({
                statusCode: 200,
                data: response
            })
        })

        this.httpServer.controller("post", "/projects", 
        (req, res, next) => {next()}, 
        async (req: any) => 
        {
            const projectDto = new InProjectDto (
                req.body.clientHost,
                req.body.ownerId,
                req.body.title,
                req.body.visibility
            )
            await this.projectUseCases.save(projectDto)
            return new HttpResponse({
                statusCode: 201,
                message: "New Project has been Created!"
            })
        })

        this.httpServer.controller("put", "/projects/:id", 
        (req, res, next) => {next()},
        async (req: any) => 
        {
            await this.projectUseCases.update(req.params.id, req.body)
            return new HttpResponse({
                statusCode: 204
            })
        })

        this.httpServer.controller("delete", "/projects/:id", 
        (req, res, next) => {next()},
        async (req: any) => 
        {
            await this.projectUseCases.delete (
                req.params.id
            )
            return new HttpResponse({
                statusCode: 200
            })
        })
    }

}