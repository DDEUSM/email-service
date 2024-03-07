export class UserDto
{
    constructor (
        public name: string,
        public email: string,
        public password: string  
    ){
        // Validação do BODY da requisição POST
    }
}