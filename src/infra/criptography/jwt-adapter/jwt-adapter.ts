import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/criptography/decrypter';
import { Encrypter } from "@/data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly _secret: string) {}

    async encrypt(value: string): Promise<string> {
        const accessToken = await jwt.sign({ id: value}, this._secret)
        return accessToken
    }

    async decrypt(token: string): Promise<string> {
        const value = await jwt.verify(token, this._secret)
        return value as string
    }
}