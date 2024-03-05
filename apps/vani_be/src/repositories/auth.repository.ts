import { BaseRepository } from '@/base';
import tables from '@/common/tables';
import {
  compareHash,
  decrypt,
  encrypt,
  encryptHash,
  generateToken,
} from '@/helpers';
import { dayjs, getError, insertBuilder } from '@/utils';
import { Request, Response } from 'express';

class AuthRepository extends BaseRepository {
  private static instance: AuthRepository;

  constructor() {
    super({ table: 'User' });
  }

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthRepository();
    }
    return this.instance;
  }

  async signIn(req: Request) {
    const { phone, password } = req.body ?? {};

    if (!phone || !password) {
      throw getError({ message: 'Please input missing fields!!' });
    }

    const encryptPhone = encrypt(phone);

    const rs = await this.execute(`
    SELECT * FROM "User"
    WHERE phone = '${encryptPhone}'
    `);

    if (!rs) {
      return [];
    }

    const isUser = compareHash(password, rs?.[0].password);

    if (!isUser) {
      throw getError({ statusCode: 401, message: 'Unauthorized!' });
    }

    await this.execute(`
                       UPDATE "User"
                       SET last_login_at = ${dayjs().toISOString()}
                       WHERE id = 1
    `);

    return {
      userId: rs?.[0]?.id,
      token: generateToken({ userId: rs?.[0]?.id }),
    };
  }

  async signUp(req: Request, _res: Response) {
    const { phone, password, firstName, lastName } = req.body ?? {};

    const userTbl = tables.User.tableName.quotationMarks;
    const userCols = tables.User.columns;
    //
    const hashedPass = await encryptHash(password);
    const decryptPhone = decrypt(phone);
    const isExistedPhone = await this.execute(`
                                              SELECT count(*)
                                              FROM "User"
                                              WHERE phone = '${decryptPhone}'
                                              `);
    console.log('isExistedPhone', isExistedPhone);

    const q = insertBuilder()
      .into(userTbl)
      .set(userCols.createdAt, dayjs().toISOString())
      .set(userCols.modifiedAt, dayjs().toISOString())
      // .set(userCols.password, hashedPass)
      // .set(userCols.username, username)
      // .set(userCols.password, hashedPass)
      // .set(userCols.firstName, firstName)
      // .set(userCols.lastName, lastName)
      .toString();

    return await this.execute(q);
  }
}

export const authRepositoryInstance = AuthRepository.getInstance();
