import { ConnectionDatabase } from "./connection-interface";

export class RedisAdapter extends ConnectionDatabase
{
    constructor(connection: any)
    {
        super(connection)
    }


    async query(statement: string, values: any): Promise<any> 
    {
        
    }


    async one(statement: string, values: any): Promise<any> 
    {
        
    }
    

    async close(): Promise<void> 
    {
        
    }
}