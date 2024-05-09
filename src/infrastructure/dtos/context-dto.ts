export class EmailContextDtoIntern
{
    constructor (
        public readonly projectId: string,
        public readonly emailTemplateId: string,
        public readonly emailFrom: string,
        public readonly title: string
    ){}
}

export class EmailContextDtoExtern
{
    constructor (
        public readonly id: string,
        public readonly projectId: string,
        public readonly emailTemplateId: string,
        public readonly emailFrom: string,
        public readonly title: string,
        public readonly createdAt: number
    ){}
}