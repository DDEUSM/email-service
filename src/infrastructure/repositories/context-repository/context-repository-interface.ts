import { EmailContext } from "../../../domain/entities/email-context";
import { OutEmailContextDto } from "../../dtos/context-dto";

export interface IContextRepository
{
    save (emailContext: EmailContext): Promise<void>
    findById (emailContextId: string): Promise<OutEmailContextDto | null>
    find (emailContextQuery: any, offset: number, limit: number): Promise<OutEmailContextDto[] | []>
    findContextRelations (emailContextId: string): Promise<any | null>
    update (emailContextId: string, updatedData: any): Promise<void>
    delete (emailContextId: string): Promise<void>
}