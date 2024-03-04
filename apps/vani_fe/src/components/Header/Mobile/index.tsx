import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { NavigationPath } from '@/common';
import {
  Button,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components';
import { FeedbackDrawer } from '@/components/FeedbackDrawer';
import { primaryColor } from '@/styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

const HeaderMobile = () => {
  const router = useRouter();
  const [goal, setGoal] = React.useState(350);

  const handleNavigate = useCallback(() => {
    // router.back();
  }, []);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }
  return (
    <React.Fragment>
      <div className="text-white p-4">
        <FeedbackDrawer
          componentTrigger={
            <Image
              priority
              src={ArrowLeft}
              className="text-white cursor-pointer"
              alt="arrow left"
              onClick={() => {}}
              height={18}
              width={18}
            />
          }>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-start">
              <DrawerTitle>Do you want to end quiz?</DrawerTitle>
              <DrawerDescription className="w-9/12 text-sm">
                Once you end this quiz, you will have to start from the first
                question again.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <div className={`flex`}>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
                <Button
                  className={`w-full ml-2 bg-[${primaryColor}]`}
                  onClick={() => router.replace(NavigationPath.INTRO)}>
                  End Quiz
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </FeedbackDrawer>
      </div>
    </React.Fragment>
  );
};

export default HeaderMobile;
