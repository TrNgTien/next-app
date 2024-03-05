import { BaseRepository } from "@/base";
import tables from "@/common/tables";
import { compareHash, encryptHash, generateToken } from "@/helpers";
import { dayjs, getError, insertBuilder, queryBuilder } from "@/utils";
import { Request, Response } from "express";

class AuthRepository extends BaseRepository {
  private static instance: AuthRepository;

  constructor() {
    super({ table: "User" });
  }

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthRepository();
    }
    return this.instance;
  }

  async signIn(req: Request) {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      throw getError({ message: "Please input missing fields!!" });
    }

    const userTbl = tables.User.NAME.withQuotationMarks;
    const userCols = tables.User.COLUMNS;
    const fields = [userCols.id, userCols.username, userCols.password];

    const q = queryBuilder()
      .fields(fields)
      .from(userTbl)
      .where(`${userCols.username} = ?`, username)
      .toString();

    const rs: { id: number; username: string; password: string }[] =
      await this.execute(q);

    const isUser = compareHash(password, rs?.[0].password);

    if (!isUser) {
      throw getError({ statusCode: 401, message: "Unauthorized!" });
    }

    return {
      userId: rs?.[0]?.id,
      token: generateToken({ userId: rs?.[0]?.id }),
    };
  }

  async signUp(req: Request, _res: Response) {
    const { username, password, firstName, lastName } = req.body ?? {};
    const userTbl = tables.User.NAME.withQuotationMarks;
    const userCols = tables.User.COLUMNS;

    const hashedPass = await encryptHash(password);

    const q = insertBuilder()
      .into(userTbl)
      .set(userCols.createdAt, dayjs().toISOString())
      .set(userCols.modifiedAt, dayjs().toISOString())
      .set(userCols.password, hashedPass)
      .set(userCols.username, username)
      .set(userCols.password, hashedPass)
      .set(userCols.firstName, firstName)
      .set(userCols.lastName, lastName)
      .toString();

    return await this.execute(q);
  }
}

export const authRepositoryInstance = AuthRepository.getInstance();
