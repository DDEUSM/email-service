export class EmailDto
{
    constructor (
        public ownerId: string,
        public emailFrom: string,
        public emailTo: string,
        public subject: string,
        public text: string,        
    ){
        // Validação do BODY da requisição POST
    }
}