import { EmailDto } from "../dtos/email-dto";
import { ApiError } from "../server/http-server/api-error";

export class ValidateBody
{
    public static validateEmail(req: any, res: any, next: any)
    {         
        const { ownerId, emailFrom, emailTo, subject, text } = req.body
        console.log(req.body)
        try 
        {
            req.emailDto = new EmailDto(ownerId, emailFrom, emailTo, subject, text)
            return next()  
        } 
        catch (error) 
        {            
            return next(new ApiError(400, "Bad Request"))
        }
    }

    public static validateUser(req: any, res: any, next: any)
    {
        const { firstName, lastName, email, birth } = req.body;
        try 
        {
            
        } 
        catch (error) 
        {
            
        }
    }
}