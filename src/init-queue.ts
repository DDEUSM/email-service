import { RegistrationMailJob } from "./application/background-jobs/registration-mail";
import { JobQueue } from "./infrastructure/queue";
import { REDIS_HOST, REDIS_PORT } from "./env";

const registerMailJob = new RegistrationMailJob()

export const jobQueue = new JobQueue(registerMailJob, `redis://${REDIS_HOST}:${REDIS_PORT}`)
console.log(REDIS_HOST, REDIS_PORT)

jobQueue.processJob()
