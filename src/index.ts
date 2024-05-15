import { ExpressHttpServer } from './infrastructure/server/http-server'
import { host, port } from './env'
import express from "express"
import { ErrorHandler } from './infrastructure/middleware/error-handler'
import { contextUseCases, projectUseCases } from './init-connections'
import { ProjectAuthHandler } from './infrastructure/middleware/auth-handler'
import { ProjectRepository } from './infrastructure/repositories/project-repository'
import { ContextRoutes } from './infrastructure/routes/internal-routes/email-context-routes/context-routes'
import { ProjectRoutes } from './infrastructure/routes/internal-routes/project-routes'

const httpServer = new ExpressHttpServer(express())

const contextRoutes = new ContextRoutes(httpServer, contextUseCases)
const projectRoutes = new ProjectRoutes(httpServer, projectUseCases)

contextRoutes.initRoutes()
projectRoutes.initRoutes()


//ProjectAuthHandler.config(projectRepository)

httpServer.middleware(ErrorHandler.handler)

httpServer.listen(port, host)
