import { authRepositoryInstance, userRepositoryInstance } from "@/repositories";
import { errorResponse, getError, responseSuccess } from "@/utils";
import { Request, Response } from "express";

class AuthService {
  private static instance: AuthService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async signIn(req: Request, res: Response) {
    try {
      const result = await authRepositoryInstance.signIn(req);

      responseSuccess({
        res,
        payload: result,
      });
    } catch (e: unknown) {
      errorResponse({
        res,
        e,
      });
    }
  }

  async signUp(req: Request, res: Response) {
    try {
      const { username, password, firstName, lastName } = req.body;
      if (!username || !password || !firstName || !lastName) {
        throw getError({
          message: "Please input missing fields!!",
        });
      }

      const isExisted = await userRepositoryInstance.isExisted({ username });

      if (isExisted) {
        throw getError({
          statusCode: 401,
          message: "User has already existed!!",
        });
      }

      await authRepositoryInstance.signUp(req, res);

      return responseSuccess({ res, payload: null });
    } catch (e: unknown) {
      errorResponse({ res, e });
    }
  }
}

export const authServiceInstance = AuthService.getInstance();
