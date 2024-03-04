import { AnswerCard } from '@/components';
import NavigationLayout from '@/components/layout/Mobile/NavigationLayout';
import { cn } from '@/lib/utils';
import questions from '@/mocks/data.json';
import { borderPrimaryColor, textPrimaryColor } from '@/styles';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Hint from './components/Hint';

export interface IAnwser {
  id: number;
  content: string;
  isCorrect: boolean;
  isMultiple?: boolean;
}

export interface IQuizData {
  id: number;
  question: string;
  answers: IAnwser[];
  hint: string;
  isMultiple?: boolean;
}

const Quiz = () => {
  const params = useParams();
  const { id = 1 } = params ?? {};
  const currentQuiz: number = +id;

  const [quizData, setQuizData] = useState<IQuizData>();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [correctList, setCorrectList] = useState<number[]>([]);
  const progress: number = useMemo(
    () => (currentQuiz / questions.length) * 100,
    [currentQuiz],
  );

  const handleMultipleAnswers = useCallback(
    ({ id, isCorrect }: { id: number; isCorrect: boolean }) => {
      if (isCorrect) {
        setCorrectList((prev) => [...prev, id]);
      }

      if (correctList.length === 2) {
        setSelectedAnswers([]);
        setCorrectList([]);
        alert('you Win');
        return;
      }

      if (selectedAnswers.length > 2) {
        setSelectedAnswers([]);
        return;
      }

      setSelectedAnswers((prev) => [...prev, id]);
    },
    [selectedAnswers, correctList],
  );

  useEffect(() => {
    setQuizData(questions[`${currentQuiz - 1}`]);
  }, [currentQuiz]);

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
        <p className="font-semibold mt-2">{quizData.question}</p>
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
