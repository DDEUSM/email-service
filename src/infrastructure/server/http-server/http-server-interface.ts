import { httpMethodTypes } from "./types"

export interface IHttpServer
{
    controller (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function): any
    middleware (middleware: Function): void
    listen (port: number, host: string ): void
}
