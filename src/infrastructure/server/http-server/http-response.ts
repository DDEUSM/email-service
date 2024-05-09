export class HttpResponse 
{
    statusCode: number
    message?: string
    data?: any

    constructor (
        httpResponseData: HttpResponseType
    ){
        Object.assign(this, httpResponseData)
    }
}

type HttpResponseType = {
    statusCode: number
    message?: string
    data?: any
}