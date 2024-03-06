export class App {
  static readonly TIMEZONE = 'Asia/Ho_Chi_Minh';
  static readonly DATE_FORMAT = 'DD-MM-YYYY';
  static readonly TIME_FORMAT = 'HH:mm:ss';
  static readonly DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
}

export class Endpoints {
  static readonly AUTH = 'auth';
  static readonly SIGN_IN = `/sign-in`;
  static readonly SIGN_UP = `/sign-up`;
  static readonly SIGN_IN_GOOGLE = `${this.SIGN_IN}/google`;
  static readonly SIGN_UP_GOOGLE = `${this.SIGN_UP}/google`;

  static readonly USER = 'users';
  static readonly QUESTIONS = 'questions';
}

export class Limit {
  static readonly L50 = 50;
  static readonly L100 = 100;
  static readonly L500 = 500;
  static readonly L1000 = 1_000;
  static readonly L5000 = 5_000;
}
