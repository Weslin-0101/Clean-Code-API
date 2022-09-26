import jwt from 'jsonwebtoken'
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter {
    private readonly _secret: string
    
    constructor(secret: string) {
        this._secret = secret
    }

    async encrypt(value: string): Promise<string> {
        await jwt.sign({ id: value}, this._secret)
        return null
    }
}