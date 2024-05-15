
export class GenerateQuery
{
    public static insert (tableName: string, properties: string[]): string
    { 
        const finalIndex = properties.length - 1

        return properties.reduce((query: string, key: string, index: number) => {
            return index === finalIndex? 
                query += "$"+(index+1)+");"
                : query += "$"+(index+1)+","            
        }, `INSERT INTO ${tableName} (${properties}) VALUES (`) as string
    }

    public static query (tableName: string, properties: string[], offset?: number, limit?: number): string
    {
        const finalIndex = properties.length - 1

        return properties.reduce((query: string, key: string, index: number) => {
            if (index === finalIndex)
            {
                query += `${key} = ${typeof offset === 'number'? 
                    (`$${index+1} OFFSET ${offset} LIMIT ${limit};`) 
                    : 
                    (`$${index+1};`)}`
                return query  
            } 
            query += `${key} = $${index+1} AND `
            return query                         
        }, `SELECT * FROM ${tableName} WHERE `) as string
    }

    public static updateOne (tableName: string, id: string, properties: string[]): string
    {    
        const finalIndex = properties.length - 1

        return properties.reduce((query: string, key: string, index: number) => {
            return index === finalIndex? 
                query += `${key} = $${(index+1)} WHERE id='${id}';`
                : query += `${key} = $${(index+1)},`            
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