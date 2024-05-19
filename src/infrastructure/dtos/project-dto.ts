import { Visibility } from "../../domain/enums/project-enum";

export class InProjectDto 
{
    constructor (
        public clientHost: string,
        public ownerId: string,
        public title: string,
        public visibility: Visibility
    ){}    
}

export class OutProjectDto 
{
    constructor (
        public id: string,
        public apiKey: string,
        public clientHost: string,
        public ownerId: string,
        public title: string,
        public visibility: Visibility,
        public createdAt: string
    ){}    
}