export class InEmailTemplateDto
{
    constructor (
        public readonly projectId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string,        
    ){
        // Validação do BODY da requisição POST
    }
}

export class OutEmailTemplateDto
{
    constructor (
        public readonly id: string,
        public readonly projectId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string,  
        public readonly createdAt: number
    ){
        // Validação do BODY da requisição POST
    }
}