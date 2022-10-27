import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter';
import { Encrypter } from "../../../data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly _secret: string) {}

    async encrypt(value: string): Promise<string> {
        const accessToken = await jwt.sign({ id: value}, this._secret)
        return accessToken
    }

    async decrypt(value: string): Promise<string> {
        await jwt.verify(value, this._secret)
        return null
    }
}