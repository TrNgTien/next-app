export const MAX_WIDTH = 1200;

export class RestPaths {
  static readonly BASE_URL = 'http://localhost:8080/v1/api';
  static readonly POST = `${this.BASE_URL}/posts`;
}

export class NavigationPath {
  static readonly LOGIN = '/';
  static readonly HOME = '/home';
  static readonly QUIZZ = '/quizz';
  static readonly REGISTER = '/register';
}

export const FontSizePages = {
  VERY_SMALL: 16,
  SMALL: 18,
  NORMAL: 20,
  LARGE: 22,
  VERY_LARGE: 24,
};
