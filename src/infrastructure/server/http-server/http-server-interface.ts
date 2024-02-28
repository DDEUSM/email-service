import { httpMethodTypes } from "./types"

export interface IHttpServer
{
    add (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function): any 
    listen (port: number, host: string ): void
}