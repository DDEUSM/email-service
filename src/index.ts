import { ExpressHttpServer } from './infrastructure/server/http-server/http-server'
import { host, port } from './env'
import express from "express"
import { ErrorHandler } from './infrastructure/middleware/error-handler'
import { contextUseCases, emailTemplateUseCases, projectUseCases } from './init-connections'
import { ContextRoutes } from './infrastructure/routes/internal-routes/email-context-routes/context-routes'
import { ProjectRoutes } from './infrastructure/routes/internal-routes/project-routes'
import { EmailTemplateRoutes } from './infrastructure/routes/internal-routes/email-template-routes/email-template-routes'

const httpServer = new ExpressHttpServer(express())

const contextRoutes = new ContextRoutes(httpServer, contextUseCases)
const projectRoutes = new ProjectRoutes(httpServer, projectUseCases)
const emailTemplateRoutes = new EmailTemplateRoutes(httpServer,emailTemplateUseCases)

httpServer.middleware(ErrorHandler.handler)

httpServer.listen(port, host)
