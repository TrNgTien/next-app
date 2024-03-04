import dotenv from 'dotenv';

dotenv.config();

class Environment {
  private static instance: Environment;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new Environment();
    }
    return this.instance;
  }

  get(key: string) {
    return process.env[key] ?? '';
  }
}

export const environment = Environment.getInstance();
