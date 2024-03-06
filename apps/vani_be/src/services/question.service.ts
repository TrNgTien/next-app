import { questionRepositoryInstance } from '@/repositories';
import { errorResponse, responseSuccess } from '@/utils';
import { Request, Response } from 'express';

export class QuestionService {
  private static instance: QuestionService;

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new QuestionService();
    }
    return this.instance;
  }

  async getCount(_req: Request, res: Response) {
    try {
      const payload = (await questionRepositoryInstance.getCount()) as {
        count: string;
      }[];

      if (!payload.length) {
        responseSuccess({ res, payload: 0 });
      }

      responseSuccess({ res, payload: +payload?.[0]?.count });
    } catch (e) {
      console.log('[getCount]: ', e);
    }
  }

  async getQuestionById(req: Request, res: Response) {
    try {
      const { params } = req;
      const { id } = params;
      const payload = await questionRepositoryInstance.getQuestionById(+id);
      responseSuccess({ res, payload });
    } catch (e) {
      errorResponse({ res, e: `[getQuestionById]: ${e}` });
    }
  }

  async answerQuestion(req: Request, res: Response) {
    try {
      const { body } = req;
      const { ids } = body;

      const payload = (await questionRepositoryInstance.answerQuestion(
        ids,
      )) as { id: number; isCorrect: boolean; isMultiple: boolean }[];

      responseSuccess({
        res,
        payload,
      });
    } catch (e) {
      errorResponse({ res, e: `[getQuestionById]: ${e}` });
    }
  }
}

export const questionServiceInstance = QuestionService.getInstance();
