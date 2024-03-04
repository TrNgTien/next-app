import React, { useState } from "react";
import eyesOpen from "@/assets/icons/eye-open.svg";
import eyesClose from "@/assets/icons/eye-close.svg";
import Image from "next/image";
import Link from "next/link";
import { GoogleButton } from "@/components";
import { NavigationPath } from "@/common";

const INPUT_STYLE = "border-solid border-2 my-2 rounded-md p-2 w-10/12 mx-auto";

const LoginPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="mt-24 mb-10 pl-8">
        <h1 className="text-4xl">Sign In</h1>
      </div>

      <div className="flex flex-col">
        <input
          placeholder="Phone Number or User Name"
          type="text"
          className={INPUT_STYLE}
        />
        <div className="relative w-10/12 mb-10 mx-auto my-2">
          <input
            placeholder="Password"
            type={!isShow ? "password" : "text"}
            className="absolute border-solid border-2  rounded-md w-full p-2"
          />

          <Image
            priority
            src={isShow ? eyesOpen : eyesClose}
            className="absolute inset-y-3 right-3"
            onClick={() => setIsShow((prev) => !prev)}
            alt="Google icon"
            height={26}
            width={26}
          />
        </div>
      </div>

      <div className="flex flex-col w-full mx-auto items-center">
        <Link href={NavigationPath.REGISTER} className="mt-6">
          Don&apos;t have an account?
        </Link>
        <Link
          href={NavigationPath.HOME}
          className="rounded-md bg-black text-white w-10/12 mx-auto my-2 p-3 text-center"
        >
          <p>Sign in</p>
        </Link>
      </div>

      <GoogleButton title={"Sign in with Google"} isSignUp={false} />
    </React.Fragment>
  );
};

export default LoginPage;
