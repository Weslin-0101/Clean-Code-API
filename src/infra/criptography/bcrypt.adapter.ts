import bcrypt from 'bcrypt'
import { Hasher } from "../../data/protocols/criptography/hasher";

export class BcryptAdapter implements Hasher {
    private readonly _salt
    
    constructor(salt: number) {
        this._salt = salt
    }

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this._salt)

    }
}