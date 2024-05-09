import { EmailDtoIntern } from "../dtos/email-dto";
import { EmailTemplateDtoIntern } from "../dtos/email-template";
import { UserDtoIntern } from "../dtos/user-dto";
import { ApiError } from "../server/http-server/api-error";

export class ValidateBody
{
    public static validateEmail(req: any, res: any, next: any)
    {         
        const { ownerId, emailFrom, emailTo, subject, text } = req.body        
        try 
        {
            req.emailDto = new EmailDtoIntern(ownerId, emailFrom, emailTo, subject, text)
            return next()  
        } 
        catch (error) 
        {            
            return next(new ApiError(400, "Bad Request"))
        }
    }

    public static validateUser(req: any, res: any, next: any)
    {
        const { firstName, lastName, email, password } = req.body;
        try 
        {
            req.userDto = new UserDtoIntern (
                firstName,
                lastName,
                email,
                password
            )            
            return next()
        } 
        catch (error) 
        {
            return next(new ApiError(400, "Bad Request"))
        }
    }

    public static validateEmailTemplate(req: any, res: any, next: any)
    {
        const { ownerId, title, subject, html } = req.body
        try 
        {
            req.emailTemplateDto = new EmailTemplateDtoIntern (
                ownerId,
                title,
                subject,
                html
            )            
            return next()
        } 
        catch (error) 
        {
            return next(new ApiError(400, "Bad Request"))
        }
    }
}