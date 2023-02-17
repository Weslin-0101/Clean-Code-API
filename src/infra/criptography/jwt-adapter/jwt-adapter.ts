import jwt from "jsonwebtoken";
import { Decrypter } from "@/data/protocols/criptography/decrypter";
import { Encrypter } from "@/data/protocols/criptography/encrypter";

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly _secret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    const ciphertext = await jwt.sign({ id: plaintext }, this._secret);
    return ciphertext;
  }

  async decrypt(ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, this._secret);
    return plaintext;
  }
}
