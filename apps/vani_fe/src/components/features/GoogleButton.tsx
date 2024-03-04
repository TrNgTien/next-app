import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import googleIcon from "@/assets/icons/google.svg";
import Image from "next/image";

export const GoogleButton = (opts: { title: string; isSignUp?: boolean }) => {
  const { title = "", isSignUp } = opts ?? {};
  const handleGoogleService = useCallback(() => {
    if (!isSignUp) {
      return;
    }

    console.log("google");
    return;
  }, [isSignUp]);

  return (
    <div className="w-full flex-col flex">
      <div className="border w-10/12 my-4 mx-auto" />
      <Button
        className="border w-10/12 my-2 mx-auto"
        variant="outline"
        onClick={handleGoogleService}
      >
        <Image
          priority
          src={googleIcon}
          alt="Google icon"
          height={26}
          width={26}
        />
        <p className="ml-2 text-center">{title}</p>
      </Button>
    </div>
  );
};

