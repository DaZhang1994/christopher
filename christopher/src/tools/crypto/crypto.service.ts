import { Injectable } from '@nestjs/common';
import * as Crypto from "crypto";
import { HexBase64Latin1Encoding } from 'crypto';

@Injectable()
export class CryptoService {
  encrypt(algorithm: string, secrets: string, content: string, encoding: HexBase64Latin1Encoding): string {
    return Crypto.createHmac(algorithm, secrets).update(content).digest(encoding);
  }
}
