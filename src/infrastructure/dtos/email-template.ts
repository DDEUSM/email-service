export class EmailTemplateDtoIntern
{
    constructor (
        public readonly ownerId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string,        
    ){
        // Validação do BODY da requisição POST
    }
}

export class EmailTemplateDtoExtern
{
    constructor (
        public readonly id: string,
        public readonly ownerId: string,
        public readonly title: string,
        public readonly subject: string,
        public readonly html: string,  
        public readonly createdAt: number
    ){
        // Validação do BODY da requisição POST
    }
}