import pgPromise from "pg-promise"
import { PostgresAdapter } from "./infrastructure/database/postgresql-adapter"
import { databaseUrl } from "./env"
import { EmailRepository } from "./infrastructure/repositories/email-respository"
import { EmailTemplateRepository } from "./infrastructure/repositories/email-template-repository"
import { UserRepository } from "./infrastructure/repositories/user-repository"
import { ContextRepository } from "./infrastructure/repositories/context-repository"
import { UserUseCases } from "./application/user-use-cases"
import { EmailUseCases } from "./application/email-use-cases"
import { Queues } from "./init-queue"
import { EmailTemplateUseCases } from "./application/email-template-use-cases"
import { EmailContextUseCases } from "./application/email-context-use-cases"
import { ProjectRepository } from "./infrastructure/repositories/project-repository"
import { ProjectUseCases } from "./application/project-use-cases"

const postgresConnection = new PostgresAdapter(pgPromise()(databaseUrl))

const emailRepository = new EmailRepository(postgresConnection)
export const emailTemplateRepository = new EmailTemplateRepository(postgresConnection)
export const userRepository = new UserRepository(postgresConnection)
export const projectRepository = new ProjectRepository(postgresConnection) 
const contextRepository = new ContextRepository(postgresConnection)

export const userUseCases = new UserUseCases(userRepository)

export const emailUseCases = new EmailUseCases (
    emailRepository,
    Queues
)

export const projectUseCases = new ProjectUseCases(
    projectRepository
) 

export const emailTemplateUseCases = new EmailTemplateUseCases (
    emailTemplateRepository,
    Queues
)
export const contextUseCases = new EmailContextUseCases (
    contextRepository,
    Queues
)