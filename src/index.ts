import { ExpressHttpServer } from './infrastructure/server/http-server'
import { host, port } from './env'
import express from "express"
import { ErrorHandler } from './infrastructure/middleware/error-handler'
import { contextUseCases, emailUseCases } from './init-connections'
import { ProjectAuthHandler } from './infrastructure/middleware/auth-handler'
import { ProjectRepository } from './infrastructure/repositories/project-repository'
import { ContextRoutes } from './infrastructure/routes/internal-routes/email-context-routes/context-routes'

const httpServer = new ExpressHttpServer(express())

const contextRoutes = new ContextRoutes(httpServer, contextUseCases)

contextRoutes.initRoutes()

const projectRepository = new ProjectRepository()
ProjectAuthHandler.config(projectRepository)

httpServer.middleware(ErrorHandler.handler)

httpServer.listen(port, host)
