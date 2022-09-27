import jwt from 'jsonwebtoken'
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter {
    constructor(private readonly _secret: string) {}

    async encrypt(value: string): Promise<string> {
        const accessToken = await jwt.sign({ id: value}, this._secret)
        return accessToken
    }
}