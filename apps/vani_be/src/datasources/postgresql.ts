import { environment } from '@/helpers';
import { getError } from '@/utils';
import { Pool, PoolConfig, QueryResult } from 'pg';

class DataSource {
  private dbConfig: PoolConfig = {
    user: environment.get('POSTGRES_USERNAME'),
    password: environment.get('POSTGRES_PASSWORD'),
    host: environment.get('POSTGRES_HOST'),
    database: environment.get('POSTGRES_DATABASE'),
    port: +environment.get('POSTGRES_PORT_LISTEN'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };

  private static instance: DataSource | null = null;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool(this.dbConfig);
  }

  static getInstance(): DataSource {
    if (!this.instance) {
      this.instance = new DataSource();
    }
    return this.instance;
  }

  async execute(queryString: string, values?: unknown[]) {
    try {
      return new Promise((resolve, reject) => {
        const handler = (err: Error, result: QueryResult<any>) => {
          if (err) {
            reject(err);
            return;
          }

          if (!result?.rows.length) {
            return;
          }

          resolve(result.rows);
        };

        this.pool.query(queryString, values, handler);
      });
    } catch (e) {
      throw getError({
        statusCode: 500,
        message: e,
      });
    }
  }

  async closeConnection() {
    await this.pool.end();
  }
}

export const datasource = DataSource.getInstance();
