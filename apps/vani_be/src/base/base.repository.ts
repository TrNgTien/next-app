import { Limit } from "@/constants";
import { datasource } from "@/datasources";
import { queryBuilder } from "@/utils";
import { IBaseRepository, IRepositoryProps } from "./types";

export class BaseRepository implements IBaseRepository {
  private table: string;

  constructor(opts: { table: string }) {
    this.table = opts.table;
  }

  async execute(queryString: string, values?: unknown[]) {
    return await datasource.execute(queryString, values);
  }

  async closeConnection() {
    return await datasource.closeConnection();
  }

  async find(opts: IRepositoryProps) {
    const { page, limit = Limit.L50, fields } = opts;

    const q = queryBuilder()
      .fields(fields)
      .from(this.table)
      .limit(limit)
      .offset(page * limit);

    return await this.execute(q.toString());
  }

  async findOne(opts: IRepositoryProps) {
    const { fields, where } = opts;

    const q = queryBuilder().fields(fields).from(this.table);

    Object.entries(where).forEach(([keyField, value]) => {
      q.where(`${keyField} = ?`, value);
    });

    return await this.execute(q.toString());
  }

  async create() {}

  createAll() {
    console.log("[createAll] props", this.table);
    return;
  }

  async updateById() {}
}
