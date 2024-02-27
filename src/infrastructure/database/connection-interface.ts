export interface IConnection 
{
    query(statement: string, values: any): Promise<any>
    one(statement: string, values: any): Promise<any>
    close(): Promise<void>
}