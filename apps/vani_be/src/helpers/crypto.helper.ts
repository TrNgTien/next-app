import crypto from 'crypto';

const algo = 'aes-256-cbc';

const key = crypto.randomBytes(32);

const iv = crypto.randomBytes(16);

interface IEncryptedData {
  iv: string;
  encryptedData: string;
}

export const encrypt = (text: string): IEncryptedData => {
  let cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

export const decrypt = (data: IEncryptedData): string => {
  let iv = Buffer.from(data.iv, 'hex');
  let encryptedText = Buffer.from(data.encryptedData, 'hex');

  let decipher = crypto.createDecipheriv(algo, Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
