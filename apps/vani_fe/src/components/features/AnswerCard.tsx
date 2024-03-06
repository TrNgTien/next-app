import { NavigationPath, RestPaths } from '@/common';
import { networkHelperInstance } from '@/helpers';
import { cn } from '@/lib/utils';
import { IAnwser } from '@/pages/quiz/[id]';
import { primaryColor } from '@/styles';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '..';
import { FeedbackDrawer } from '../FeedbackDrawer';

type TProps = IAnwser & {
  handleMultipleAnswers: (props: { id: number }) => any;
  selectedAnswers: number[];
};

export const AnswerCard = (props: TProps) => {
  const router = useRouter();
  const params = useParams();
  const { id: currentQuestion } = params ?? {};
  const [answerResult, setAnswerResult] = useState(false);
  const [resultMultiple, setResultMultiple] = useState(false);
  const [answerMultiResult, setAnswerMultiResult] = useState([]);
  const { selectedAnswers, handleMultipleAnswers, content, isMultiple, id } =
    props;

  const answerQuiz = useCallback(
    async (body: { ids: number[] }) => {
      const rs = await networkHelperInstance.send({
        method: 'POST',
        url: `${RestPaths.QUIZ}/${currentQuestion}`,
        body,
      });

      return rs;
    },
    [currentQuestion],
  );

  const handleAnswer = useCallback(async () => {
    const ids: number[] = [];

    if (!isMultiple) {
      const rs = await answerQuiz({ ids: [...ids, id] });
      setAnswerResult(rs?.[0]?.isCorrect);
      return;
    }
  }, [answerQuiz, id, isMultiple]);

  const handleMultiple = useCallback(async () => {
    const answerQuizMultiple = await handleMultipleAnswers({ id });

    setResultMultiple(answerQuizMultiple.length > 1);
    setAnswerMultiResult(answerQuizMultiple);

  }, [handleMultipleAnswers, id]);

  console.log(resultMultiple, answerMultiResult);
  return (
    <React.Fragment>
      {!isMultiple ? (
        <FeedbackDrawer
          componentTrigger={
            <Button
              className={cn(
                isMultiple && selectedAnswers.includes(id) && 'bg-slate-200',
                'border w-full mx-auto p-8',
              )}
              variant="outline"
              onClick={handleAnswer}>
              {content}
            </Button>
          }>
          {!answerResult ? (
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-start">
                <DrawerTitle>Please try again</DrawerTitle>
                <DrawerDescription className="w-9/12 text-sm">
                  You get wrong answer!
                </DrawerDescription>
              </DrawerHeader>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-start">
                <DrawerTitle>Correct</DrawerTitle>
                <DrawerDescription className="w-9/12 text-sm">
                  You are great!
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <div className="flex">
                  <Button
                    className={`w-full ml-2 bg-[${primaryColor}]`}
                    onClick={() =>
                      router.replace(
                        `${NavigationPath.QUIZ}/${+currentQuestion + 1}`,
                      )
                    }>
                    Next
                  </Button>
                </div>
              </DrawerFooter>
            </div>
          )}
        </FeedbackDrawer>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              className={cn(
                isMultiple && selectedAnswers.includes(id) && 'bg-slate-200',
                'border w-full mx-auto p-8',
              )}
              variant="outline"
              onClick={handleMultiple}>
              {content}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            {answerMultiResult.length > 1 && !resultMultiple ? (
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="text-start">
                  <DrawerTitle>Please try again</DrawerTitle>
                  <DrawerDescription className="w-9/12 text-sm">
                    You get wrong answer!
                  </DrawerDescription>
                </DrawerHeader>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="text-start">
                  <DrawerTitle>Correct</DrawerTitle>
                  <DrawerDescription className="w-9/12 text-sm">
                    You are great!
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <div className="flex">
                    <Button
                      className={`w-full ml-2 bg-[${primaryColor}]`}
                      onClick={() =>
                        router.replace(
                          `${NavigationPath.QUIZ}/${+currentQuestion + 1}`,
                        )
                      }>
                      Next
                    </Button>
                  </div>
                </DrawerFooter>
              </div>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </React.Fragment>
  );
};
