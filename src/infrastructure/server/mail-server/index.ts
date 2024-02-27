import nodemailer, { TransportOptions } from 'nodemailer'
import { smtpParameters } from '../../../env'

export default nodemailer.createTransport(smtpParameters as TransportOptions)