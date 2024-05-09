export interface IJob
{
    key: string
    handle({ data }: any): Promise<any>
}