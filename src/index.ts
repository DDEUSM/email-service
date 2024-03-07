
import { ExpressHttpServer } from './infrastructure/server/http-server'
import { EmailRoutes } from './infrastructure/routes/email-routes'
import { EmailUseCases } from './application/use-cases'
import { EmailRepository } from './infrastructure/repositories/email-respository'
import { databaseUrl, host, port } from './env'
import { PostgresAdapter } from './infrastructure/database/postgresql-adapter'
import pgPromise from 'pg-promise'
import { jobQueue } from './init-queue'
import { UserRepository } from './infrastructure/repositories/user-repository'
import express from "express"
import { ErrorHandler } from './infrastructure/middleware/error-handler'

const httpServer = new ExpressHttpServer(express())

const postgresConnection = new PostgresAdapter(pgPromise()(databaseUrl))

const emailRepository = new EmailRepository(postgresConnection)

const userRepository = new UserRepository(postgresConnection)

const emailUseCases = new EmailUseCases (
    emailRepository, 
    userRepository,
    jobQueue
)

const emailRoutes = new EmailRoutes(httpServer, emailUseCases)

emailRoutes.initRoutes()

httpServer.middleware(ErrorHandler.handler)

httpServer.listen(port, host)
