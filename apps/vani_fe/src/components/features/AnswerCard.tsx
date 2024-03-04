import { NavigationPath } from '@/common';
import { cn } from '@/lib/utils';
import { IAnwser } from '@/pages/quiz/[id]';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Button } from '..';

type TProps = IAnwser & {
  handleMultipleAnswers: (props: { id: number; isCorrect: boolean }) => void;
  selectedAnswers: number[];
};

export const AnswerCard = (props: TProps) => {
  const router = useRouter();
  const params = useParams();
  const { id: currentQuestion } = params ?? {};
  const {
    isCorrect,
    selectedAnswers,
    handleMultipleAnswers,
    content,
    isMultiple,
    id,
  } = props;

  const handleAnswer = useCallback(() => {
    if (!isMultiple) {
      if (isCorrect) {
        router.push(`${NavigationPath.QUIZ}/${+currentQuestion + 1}`);

        return;
      }

      return;
    }

    return handleMultipleAnswers({ id, isCorrect });
  }, [
    isMultiple,
    handleMultipleAnswers,
    id,
    isCorrect,
    router,
    currentQuestion,
  ]);

  return (
    <Button
      className={cn(
        selectedAnswers.includes(id) && 'bg-slate-200',
        'border w-full mx-auto p-8',
      )}
      variant="outline"
      onClick={handleAnswer}>
      {content}
    </Button>
  );
};
