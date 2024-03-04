import { Button } from "@/components";
import { useRouter } from "next/navigation";
import PrizeImg from "@/assets/images/prize.png";
import React from "react";
import Image from "next/image";
import { NavigationPath } from "@/common";

const Quizz = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between bg-slate-100 h-screen">
      <div className="bg-[#4C00B4] text-white h-4/5 p-8 font-medium mb-10">
        <h1 className="mt-20 text-xl text-center">
          Take the Quiz of Vani Coins to get instantly 1,000 coins
        </h1>
        <Image className="mt-14" priority src={PrizeImg} alt="Google icon" />
      </div>
      <div className="bg-slate-200 rounded-t-xl text-white h-24 p-4">
        <Button
          className="w-full bg-[#4C00B4] text-white mx-auto mt-2 p-6 font-semibold"
          onClick={() => router.push(NavigationPath.QUIZZ)}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default Quizz;
