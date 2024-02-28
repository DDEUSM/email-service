import { httpMethodTypes } from "./types"

export interface IHttpServer
{
    add (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function): any 
    listen (host: string, port: number): void
}