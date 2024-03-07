export abstract class ConnectionDatabase
{    
    constructor (
        public connection: any
    ){}

    abstract query(statement: string, values: any): Promise<any>
    abstract one(statement: string, values: any): Promise<any>
    abstract close(): Promise<void>
}