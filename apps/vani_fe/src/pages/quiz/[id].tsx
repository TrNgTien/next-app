import { RestPaths } from '@/common';
import { AnswerCard } from '@/components';
import NavigationLayout from '@/components/layout/Mobile/NavigationLayout';
import { networkHelperInstance } from '@/helpers';
import { cn } from '@/lib/utils';
import { borderPrimaryColor, textPrimaryColor } from '@/styles';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Hint from './components/Hint';

export interface IAnwser {
  id: number;
  content: string;
  isCorrect: boolean;
  isMultiple?: boolean;
}

export interface IQuizData {
  id: number;
  content: string;
  answers: IAnwser[];
  hint: string;
  isMultiple?: boolean;
}

let ids: number[] = [];
const Quiz = () => {
  const params = useParams();
  const { id = 1 } = params ?? {};
  const currentQuiz: number = +id;
  const router = useRouter();
  const [quizData, setQuizData] = useState<IQuizData>();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const answerQuiz = useCallback(
    async (body: { ids: number[] }) => {
      const rs = await networkHelperInstance.send({
        method: 'POST',
        url: `${RestPaths.QUIZ}/${currentQuiz}`,
        body,
      });

      return rs;
    },
    [currentQuiz],
  );

  const handleMultipleAnswers = useCallback(
    async ({ id }: { id: number }) => {
      if (ids.includes(id)) {
        return;
      }

      ids.push(id);

      setSelectedAnswers((prev) => [...prev, id]);

      if (ids.length > 1) {
        const rs = await answerQuiz({ ids: ids });

        if (rs.length > 1) {
          ids = [];
          setSelectedAnswers([]);
          return rs;
        }

        return [];
      }
      return []
    },
    [answerQuiz],
  );

  const getQuestion = useCallback(async () => {
    try {
      const res = (await networkHelperInstance.send({
        method: 'GET',
        url: `${RestPaths.QUIZ}/${currentQuiz}`,
      })) as IQuizData[];
      setQuizData(res[0]);
    } catch (e) {
      console.error('[getQuestion] ', e);
    }
  }, [currentQuiz]);

  const getCountQuestions = useCallback(async () => {
    try {
      const count = await networkHelperInstance.send({
        method: 'GET',
        url: `${RestPaths.QUIZ}/count`,
      });

      setProgress((currentQuiz / count) * 100);
    } catch (e) {
      console.error('[getCountQuestions] ', e);
    }
  }, [currentQuiz]);

  useEffect(() => {
    getQuestion();
    getCountQuestions();
  }, [getQuestion, getCountQuestions]);

  return !quizData ? (
    <h1>Loading....</h1>
  ) : (
    <NavigationLayout>
      <div className="bg-slate-300 w-full">
        <div
          className={cn(borderPrimaryColor, 'border-4')}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="p-6">
        <h1 className={cn(textPrimaryColor, 'font-bold')}>Q{id}</h1>
        <p className="font-semibold mt-2">{quizData.content}</p>
        {quizData.answers.map((item: IAnwser) => {
          const { id } = item ?? {};
          const cardData = {
            ...item,
            isMultiple: quizData.isMultiple,
            selectedAnswers,
          };
          return (
            <div key={id} className="mt-4">
              <AnswerCard
                {...cardData}
                handleMultipleAnswers={handleMultipleAnswers}
              />
            </div>
          );
        })}
      </div>
      <div className="border w-11/12 my-2 mx-auto" />
      <div className="pl-4">
        <Hint hint={quizData.hint} id={currentQuiz} />
      </div>
    </NavigationLayout>
  );
};

export default Quiz;
