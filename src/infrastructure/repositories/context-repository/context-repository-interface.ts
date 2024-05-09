import { EmailContext } from "../../../domain/entities/email-context";
import { EmailContextDtoExtern } from "../../dtos/context-dto";

export interface IContextRepository
{
    save (emailContext: EmailContext): Promise<void>
    findById (emailContextId: string): Promise<EmailContextDtoExtern | null>
    find (emailContextQuery: {[key: string]: any} & {offset: number, itensLimit: number}): Promise<EmailContextDtoExtern[] | []>
    findContextRelations (emailContextId: string): Promise<any | null>
    update (emailContextId: string, updatedData: any): Promise<void>
    delete (emailContextId: string): Promise<void>
}