import bcrypt from 'bcrypt';
import crypto from 'crypto';

const SALT_ROUNDS = 10;

export const encryptHash = async (payload: string) => {
  return await bcrypt.hash(payload, SALT_ROUNDS);
};

export const encryptHashData = async (payload: string) => {
  const iv = 'some 16 byte iv';
  const key = 'some 16 byte long key';
  const plainText = 'some plain text';
  const algo = 'aes-256-cbc';

  const cipher = crypto.createCipheriv(algo, new Buffer(key), new Buffer(iv));
  var encrypted = cipher.update(plainText, 'utf-8', 'base64'); // `base64` here represents output encoding
  encrypted += cipher.final('base64');
  console.log('[CHeck encrypted]', encrypted);

  return encrypted;
};

export const compareHash = async (payload: string, hashedPassword: string) => {
  return await bcrypt.compare(payload, hashedPassword);
};
