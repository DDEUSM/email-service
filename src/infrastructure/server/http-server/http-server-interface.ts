import { httpMethodTypes } from "./types"

export interface IHttpServer
{
    add (httpMethod: httpMethodTypes, uri: string, middleware: Function, controller: Function): any
    middleware (middleware: Function): void
    listen (port: number, host: string ): void
}

// npx jest ./src/infrastructure/routes/email-context-routes/email-context-routes.spec.ts 