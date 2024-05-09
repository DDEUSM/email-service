import * as jobs from "./application/background-jobs";
import { JobQueue } from "./infrastructure/queue";
import { REDIS_HOST, REDIS_PORT } from "./env";

const url = `redis://${REDIS_HOST}:${REDIS_PORT}`

export type QueueMapType = {
    [ queueKey: string ]: JobQueue
}

const Queues: QueueMapType = Object.values(jobs).reduce((queueMap: QueueMapType, Job) => 
{
    const newJob = new Job()
    queueMap[newJob.key] = new JobQueue(newJob, url)
    queueMap[newJob.key].processJob()
    return queueMap
}, {})

export { Queues }