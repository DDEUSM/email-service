import { IHttpServer } from "../server/http-server/http-server-interface"

export abstract class Routes
{
    constructor (
        protected httpServer: IHttpServer
    ){}

    public abstract initRoutes(): void
}