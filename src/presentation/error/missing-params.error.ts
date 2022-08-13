export class MissingParamError extends Error {
    constructor(paramNome: string) {
        super(`Missing param: ${paramNome}`)
        this.name = 'MissingParamError'
    }
}