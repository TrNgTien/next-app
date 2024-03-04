export class App {
  static readonly TIMEZONE = 'Asia/Ho_Chi_Minh';
  static readonly DATE_FORMAT = 'DD-MM-YYYY';
  static readonly TIME_FORMAT = 'HH:mm:ss';
  static readonly DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
}

export class Endpoints {
  static readonly AUTH = 'auth';
  static readonly SIGN_IN = `${this.AUTH}/sign_in`;
  static readonly SIGN_UP = `${this.AUTH}/sign_up`;
  
  static readonly USER = 'users';
  static readonly POST = 'posts';
}

export class Limit{
  static readonly L50 = 50;
  static readonly L100 = 100;
  static readonly L500 = 500;
  static readonly L1000 = 1_000;
  static readonly L5000 = 5_000;
}


