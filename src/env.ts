import dotenv from 'dotenv'
dotenv.config()

export const smtpParameters = {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
}

export const port = Number(process.env.PORT) || 4331

export const host = process.env.HOST

export const databaseUrl = process.env.DATABASE_URL
