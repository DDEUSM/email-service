import Queue from "bull"
import { IJob } from "../../application/background-jobs/Job"

export class JobQueue 
{
    private jobQueue: Queue.Queue<any>
    public jobProcess: IJob

    constructor (
        jobProcess: IJob,
        databaseUrl: string
    ){
        this.jobProcess = jobProcess
        this.jobQueue = new Queue(jobProcess.key, databaseUrl)
        this.jobQueue.on('failed', (job, err) => 
        {
            console.log("failed", job.name, job.data)
            console.log(err)
        })
    }

    async addJob (data: any): Promise<any>
    {
        await this.jobQueue.add(data)
    }   
    
    processJob ()
    {
        this.jobQueue.process(this.jobProcess.handle)
    }
}