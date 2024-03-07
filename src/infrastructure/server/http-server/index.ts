import { IHttpServer } from "./http-server-interface"
import express, { Request, Response, NextFunction } from 'express'
import { httpMethodTypes } from "./types"
import { HttpResponse } from "./http-response"

export class ExpressHttpServer implements IHttpServer
{

    constructor (private httpServer: any) 
    {        
        this.httpServer.use(express.json())        
    }

    add (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function)
    {
        const params = [uri, middleware].filter(param => param)
        this.httpServer[httpMethod](...params, async (req: Request, res: Response, next: NextFunction) => {
            try 
            {                
                const response: HttpResponse = await controller(req)
                res.status(response.statusCode).json({ message: response.message })    
            } 
            catch (error) 
            {
                next(error)
            }            
        })             
    }

    middleware (middleware: Function): void
    {
        this.httpServer.use(middleware)
    }

    listen (port: number, host: string)
    {
        this.httpServer.listen(port, host, () => console.log(`Server running on http://${host}:${port}`))

    }
}
