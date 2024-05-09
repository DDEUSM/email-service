export class UserDtoIntern
{
    constructor (
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly teamId?: string,
        public readonly roleId?: string
    ){
        // Validação do BODY da requisição POST
    }
}

export class UserDtoExtern
{
    constructor (
        public readonly id: string,
        public readonly teamId: string,
        public readonly roleId: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly createdAt: string
    ){
        // Validação do BODY da requisição POST
    }
}