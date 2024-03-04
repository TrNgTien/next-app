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
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const HeaderMobile = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <div className="text-white p-4">
        <FeedbackDrawer
          componentTrigger={
            <ChevronLeft className={`text-[${primaryColor}]`} />
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
              <div className="flex">
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
