import ArrowUp from '@/assets/icons/arrow-up.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState } from 'react';

const Hint = () => {
  const [isShowHint, setIsShowHint] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div
        className="flex cursor-pointer"
        onClick={() => setIsShowHint((prev) => !prev)}>
        <p className="font-semibold">Hint</p>
        <Image
          priority
          src={ArrowUp}
          className={cn(isShowHint && 'rotate-180', 'text-white ml-2')}
          alt="arrow left"
          height={12}
          width={12}
        />
      </div>
      {isShowHint && (
        <p className="mt-4 font-medium opacity-50 italic">
          You can use vani Barcode to earn or redeem membership points
        </p>
      )}
    </React.Fragment>
  );
};

export default Hint;
