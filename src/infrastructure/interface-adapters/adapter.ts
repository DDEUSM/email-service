export abstract class Adapter
{
    protected static clearObject(object: any)
    {
        return Object.keys(object).reduce((finalObject: any, key: any, index: number) => 
        {
            object[key] || typeof object[key] === 'number'? finalObject[key] = object[key] : null
            return finalObject
        }, {})
    }
}