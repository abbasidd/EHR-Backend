import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import * as forge from 'node-forge';

@Injectable()
export class CryptoService {
    public async encryptSymmetric(data: string, publicKey: string): Promise<string> {
        const encryptionKey = 'YourEncryptionKey';
        const encryptedData = CryptoJS.AES.encrypt(data, encryptionKey).toString();
        return encryptedData;
    }

    public decryptSymmetric(encryptedData: string): string {
        const encryptionKey = 'YourEncryptionKey';
        const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedData;
    }

    public getPublicKey(): string[] {
        const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        return [forge.pki.publicKeyToPem(keyPair.publicKey), forge.pki.privateKeyToPem(keyPair.privateKey)];
    }

    // Encrypt data using the recipient's public key
    public encryptAsymmetric(data: string, publicKeyPem: string): string {
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        const encryptedData = publicKey.encrypt(data, 'RSA-OAEP');
        return forge.util.encode64(encryptedData);
    }

    // Decrypt data using the recipient's private key
    public decryptAsymmetric(encryptedData: string, privateKeyPem: string): string {
        const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
        const decodedData = forge.util.decode64(encryptedData);
        const decryptedData = privateKey.decrypt(decodedData, 'RSA-OAEP');
        return decryptedData;
    }
}



