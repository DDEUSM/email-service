export class ApiError extends Error
{
    statusCode: number
    name: string
    stack?: string
    
    constructor (
        statusCode: number,
        message: string,
    ){
        super(message)
        this.statusCode = statusCode
    }
}

