import NavigationLayout from '@/components/layout/Mobile/NavigationLayout';
import { cn } from '@/lib/utils';
import { borderPrimaryColor, textPrimaryColor } from '@/styles';
import { useParams } from 'next/navigation';
import Hint from './components/Hint';

const Quiz = () => {
  const params = useParams();
  const total = 4;
  const progress: number = (3 / total) * 100;
  const { id = 0 } = params ?? {};

  return (
    <NavigationLayout>
      <div className="bg-slate-300 w-full">
        <div
          className={cn(borderPrimaryColor, 'border-4')}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="p-6">
        <h1 className={cn(textPrimaryColor, 'font-bold')}>Q{id}</h1>
        <p className="font-semibold mt-2">
          How can you accumulate and use membership points with vani?
        </p>
      </div>
      <div className="border w-11/12 my-2 mx-auto" />
      <div className="pl-4">
        <Hint />
      </div>
    </NavigationLayout>
  );
};

export default Quiz;
