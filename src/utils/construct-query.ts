export function generateQuery(data: any, tableName: string): string
{
    const values = Object.values(data)
    const keys = Object.keys(data)    
    const finalIndex = values.length - 1

    return values.reduce((query, current, index) => {
        return index === finalIndex? 
            query += "$"+(index+1)+");"
            : query += "$"+(index+1)+","            
    }, `INSERT INTO ${tableName} (${keys}) VALUES (`) as string
}

export function adaptDateToDb(date: Date): string
{
    return date.toLocaleDateString("en-us").replaceAll("/", "-")
}