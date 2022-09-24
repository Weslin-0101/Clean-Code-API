import bcrypt from 'bcrypt'
import { Encrypter } from "../../data/protocols/criptography/encrypter";

export class BcryptAdapter implements Encrypter {
    private readonly _salt
    
    constructor(salt: number) {
        this._salt = salt
    }

    async encrypt(value: string): Promise<string> {
        return bcrypt.hash(value, this._salt)

    }
}