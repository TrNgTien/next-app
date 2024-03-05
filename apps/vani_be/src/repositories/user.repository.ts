import { BaseRepository } from '@/base';
import { IUser } from '@/common';

export class UserRepository extends BaseRepository {
  private static instance: UserRepository;

  constructor() {
    super({ table: "'User'" });
  }
  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserRepository();
    }
    return this.instance;
  }

  async getUsers() {
    const q = `
    select
    id,
    created_at as "createdAt",
    modified_at as "modifiedAt",
    status,
    activated_at as "activatedAt",
    last_login_at as "lastLoginAt"
    phone
    from "User"
    limit 50
    offset 0
    `;
    return (await this.execute(q)) as IUser[];
  }

  async isExisedUser() {
    const q = `
    SELECT id, phone
    FROM "User"
    WHERE phone
    `;
    return (await this.execute(q)) as IUser[];
  }
}

export const userRepositoryInstance = UserRepository.getInstance();
