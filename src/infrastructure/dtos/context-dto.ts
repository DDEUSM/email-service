export class InEmailContextDto
{
    constructor (
        public readonly projectId: string,
        public readonly emailTemplateId: string,
        public readonly emailFrom: string,
        public readonly title: string
    ){}
}

export class OutEmailContextDto
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