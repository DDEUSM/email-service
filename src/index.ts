
import { ExpressHttpServer } from './infrastructure/server/http-server'
import { EmailRoutes } from './infrastructure/routes/email-routes'
import { EmailUseCases } from './application/use-cases'
import { EmailRepository } from './infrastructure/repositories/email-respository'
import { host, port } from './env'
import { PostgresAdapter } from './infrastructure/database/postgresql-adapter'
import smtpTransport from './infrastructure/server/mail-server'

const httpServer = new ExpressHttpServer()

const postgresConnection = new PostgresAdapter()

const emailRepository = new EmailRepository(postgresConnection)

const emailUseCases = new EmailUseCases(emailRepository, smtpTransport)

const emailRoutes = new EmailRoutes(httpServer, emailUseCases)

emailRoutes.initRoutes()

httpServer.listen(host, port)