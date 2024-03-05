import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encryptHash = async (payload: string) => {
  return await bcrypt.hash(payload, SALT_ROUNDS);
};

export const compareHash = async (payload: string, hashedPassword: string) => {
  return await bcrypt.compare(payload, hashedPassword);
};
