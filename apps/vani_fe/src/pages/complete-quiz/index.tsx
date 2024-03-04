import PrizeImg from '@/assets/images/prize.png';
import { Button } from '@/components';
import NavigationLayout from '@/components/layout/Mobile/NavigationLayout';
import { cn } from '@/lib/utils';
import { FLEX_COL_STYLE, primaryColor } from '@/styles';
import Image from 'next/image';

const CompletePage = () => {
  return (
    <NavigationLayout>
      <div className={`h-screen  bg-[${primaryColor}] text-white text-center`}>
        <div>
          <div className="p-12 w-full text-2xl">
            <h1>You solved all the quizzies correctly!</h1>
            <p className="w-full mt-6 text-base text-[#B47BF7]">
              1,000 Vani Coins Coupon has arrived
            </p>
          </div>
          <Image
            className="mx-auto"
            priority
            height={200}
            width={200}
            src={PrizeImg}
            alt="Prize Image"
          />
        </div>
        <div className={cn(FLEX_COL_STYLE, 'w-full my-10 text-center')}>
          <Button
            className="border w-11/12 mx-auto p-6"
            variant="outline"
            onClick={() => {}}>
            <p className={`text-base text-[${primaryColor}] font-bold`}>
              Check Coupon
            </p>
          </Button>
          <p className="w-10/12 mx-auto mt-6 text-xs text-[#B47BF7]">
            Please check inbox and use a coupon to earn Vani Coin
          </p>
        </div>
      </div>
    </NavigationLayout>
  );
};

export default CompletePage;
