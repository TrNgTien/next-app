import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Hint = (props: { hint: string, id: number }) => {
  const { hint, id } = props;
  const [isShowHint, setIsShowHint] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setIsShowHint(false);
    };
  }, [id]);

  return (
    <React.Fragment>
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setIsShowHint((prev) => !prev)}>
        <p className="font-semibold">Hint</p>
        <ChevronDown
          className={cn(
            isShowHint && 'rotate-180',
            'text-white ml-2 text-black',
          )}
        />
      </div>
      {isShowHint && (
        <p className="mt-4 w-10/12 font-medium opacity-50 italic">{hint}</p>
      )}
    </React.Fragment>
  );
};

export default Hint;
