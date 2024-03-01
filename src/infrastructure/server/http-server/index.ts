import { IHttpServer } from "./http-server-interface"
import express, { Request, Response, NextFunction } from 'express'
import { httpMethodTypes } from "./types"
import { host } from "../../../env"
import { HttpResponse } from "./http-response"

export class ExpressHttpServer implements IHttpServer
{
    private httpServer: any

    constructor (){
        this.httpServer = express()
        this.httpServer.use(express.json())        
    }

    add (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function)
    {
        const params = [uri, middleware].filter(param => param)
        this.httpServer[httpMethod](...params, async (req: Request, res: Response, next: NextFunction) => {
            try 
            {
                console.log("foi")
                const response: HttpResponse = await controller(req)
                res.status(response.statusCode).json({ message: response.message })    
            } 
            catch (error) 
            {
                next(error)
            }            
        })             
    }

    listen (host: string, port: number)
    {
        this.httpServer.listen(4331, () => console.log(`Server running on http://${host}:${port}`))
    }
}