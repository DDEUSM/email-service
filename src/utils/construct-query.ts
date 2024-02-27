export function generateQuery(values: any, keys: any): string
{
    const finalIndex = values.length - 1
    return values.reduce((query, current, index) => {
        return index === finalIndex? 
            query += "$"+(index+1)+");"
            : query += "$"+(index+1)+","            
    }, `INSERT INTO emails (${keys}) VALUES (`)
}

export function adaptDateToDb(date: Date): string
{
    return date.toLocaleDateString("en-us").replaceAll("/", "-")
}