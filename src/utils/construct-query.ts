import { getRandomValues } from "crypto"
import { opendir } from "fs"

export class GenerateQuery
{
    private static formatData(data: any): {values: any, keys: string[], finalIndex: number}
    {
        const values = Object.values(data)
        const keys = Object.keys(data)    
        const finalIndex = values.length - 1
        return { values, keys, finalIndex }
    }

    public static insert (tableName: string, data: any): string
    {
        const { values, keys, finalIndex } = GenerateQuery.formatData(data)

        return values.reduce((query, current, index) => {
            return index === finalIndex? 
                query += "$"+(index+1)+");"
                : query += "$"+(index+1)+","            
        }, `INSERT INTO ${tableName} (${keys}) VALUES (`) as string
    }

    public static query (tableName: string, data: any, offset?: number, limit?: number): string
    {
        const { values, keys, finalIndex } = GenerateQuery.formatData(data)

        return values.reduce((query: string, current: any, index: number) => {
            if (index === finalIndex)
            {
                query += `${keys[index]} = ${typeof offset === 'number'? 
                    (`$${index+1} OFFSET ${offset} LIMIT ${limit};`) 
                    : 
                    (`$${index+1};`)}`
                return query  
            } 
            query += `${keys[index]} = $${index+1},`
            return query                         
        }, `SELECT * FROM ${tableName} WHERE `) as string
    }

    public static updateOne (tableName: string, id: string, updatedData: any): string
    {
        const { values, keys, finalIndex } = GenerateQuery.formatData(updatedData)

        return values.reduce((query, current, index) => {
            return index === finalIndex? 
                query += `${keys[index]} = $${(index+1)} WHERE id=$${(index+2)};`
                : query += `${keys[index]} = $${(index+1)},`            
        }, `UPDATE ${tableName} SET `) as string
    }

    public static deleteOne (tableName: string): string
    {
        return 'DELETE FROM '+tableName+' WHERE id = $1;'
    }
}

export function adaptDateToDb(date: Date): string
{
    return date.toLocaleDateString("en-us").replaceAll("/", "-")
}