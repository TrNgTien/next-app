import { BaseRepository } from '@/base';

export class QuestionRepository extends BaseRepository {
  private static instance: QuestionRepository;

  constructor() {
    super({ table: 'Question' });
  }

  //------------------------------------------------
  static getInstance() {
    if (!this.instance) {
      this.instance = new QuestionRepository();
    }
    return this.instance;
  }

  async getCount() {
    try {
      const q = `
      SELECT
      COUNT(*)
      FROM "Question"
    `;

      return await this.execute(q);
    } catch (e) {
      console.log('e', e);
    }
  }

  async getQuestionById(id: number) {
    try {
      const q = `
      SELECT
      q.id,
      q.content,
      q.hint,
      q.is_multiple as "isMultiple",
      JSONB_AGG(
        JSONB_BUILD_OBJECT(
          'id', a.id,
          'content', a.content ,
          'isCorrect', a.is_correct
        )
      ) as "answers"
      FROM "Question" q LEFT JOIN "Answer" a ON a.question_id = q.id
      WHERE q.id = ${id}
      GROUP BY q.id
      LIMIT 50
      OFFSET 0
      `;
      return await this.execute(q);
    } catch (e) {
      console.log('[getQuestionById]', e);
    }
  }
}

export const questionRepositoryInstance = QuestionRepository.getInstance();
