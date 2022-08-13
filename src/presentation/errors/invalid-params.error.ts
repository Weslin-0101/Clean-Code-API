export class InvalidParamError extends Error {
    constructor(paramNome: string) {
        super(`Invalid param: ${paramNome}`)
        this.name = 'InvalidParamError'
    }
}