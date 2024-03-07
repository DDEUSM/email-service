export abstract class Job
{
    key: string
    abstract handle({ data }: any): Promise<any>
}