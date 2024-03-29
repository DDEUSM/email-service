import { connect } from "http2";
import { databaseUrl } from "../../env";
import { ConnectionDatabase } from "./connection-interface";
import pgp from 'pg-promise'

export class PostgresAdapter extends ConnectionDatabase
{
    constructor(connection: any)
    {
        super(connection)
    }

    async query(statement: string, values: any): Promise<any> 
    {
        return await this.connection.query(statement, values)
    }

    async one(statement: string, values: any): Promise<any> 
    {
        return await this.connection.one(statement, values)
    }

    async close(): Promise<void> 
    {
        await this.connection.$pool.end()    
    }
}