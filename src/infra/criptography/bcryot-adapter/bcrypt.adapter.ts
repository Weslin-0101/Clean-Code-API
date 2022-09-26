import bcrypt from 'bcrypt'
import { HashComparer } from '../../../data/protocols/criptography/hash-comparer';
import { Hasher } from "../../../data/protocols/criptography/hasher";

export class BcryptAdapter implements Hasher, HashComparer {
    private readonly _salt
    
    constructor(salt: number) {
        this._salt = salt
    }
    
    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this._salt)
        
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash)
    }
}