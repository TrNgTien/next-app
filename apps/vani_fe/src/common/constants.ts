export const MAX_WIDTH = 1200;

export class RestPaths {
  static readonly BASE_URL = 'http://34.125.153.111/:8080/v1/api';
  static readonly QUIZ = `${this.BASE_URL}/questions`;
}

export class NavigationPath {
  static readonly INTRO = '/';
  static readonly SIGN_IN = '/sign-in';
  static readonly SIGN_UP = '/sign-up';
  static readonly QUIZ = '/quiz';
  static readonly COMPLETE_QUIZ = '/complete-quiz';
}

export const FontSizePages = {
  VERY_SMALL: 16,
  SMALL: 18,
  NORMAL: 20,
  LARGE: 22,
  VERY_LARGE: 24,
};
