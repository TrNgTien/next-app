import { environment } from '@/helpers';
import { getError } from '@/utils';
import { Pool, PoolConfig } from 'pg';

class DataSource {
  private dbConfig: PoolConfig = {
    user: environment.get('APP_ENV_POSTGRES_USERNAME'),
    password: environment.get('APP_ENV_POSTGRES_PASSWORD'),
    host: environment.get('APP_ENV_POSTGRES_HOST'),
    database: environment.get('APP_ENV_POSTGRES_DATABASE'),
    port: +environment.get('APP_ENV_POSTGRES_PORT_LISTEN'),
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
      const rs = await this.pool.query(queryString, values);

      return rs?.rows;
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
