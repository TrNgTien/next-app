import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { GoogleButton } from "@/components";
import { NavigationPath } from "@/common";

const INPUT_STYLE = "border-solid border-2 my-2 rounded-md p-2 w-10/12 mx-auto";

const LoginPage = () => {
  return (
    <React.Fragment>
      <div className="mt-24 mb-10 pl-8">
        <h1 className="text-4xl">Sign Up</h1>
      </div>
      <div className="flex flex-col">
        <input placeholder="User Name" className={INPUT_STYLE} />
        <input placeholder="Phone Number" className={INPUT_STYLE} />
        <input placeholder="Password" className={INPUT_STYLE} />
      </div>
      <div className="flex flex-col w-full mx-auto items-center">
        <Link href={NavigationPath.HOME} className="mt-6 my-2">
          Already have an account?
        </Link>
        <Button
          className="border bg-black text-white w-10/12 mx-auto  p-4"
          variant="outline"
        >
          Sign up
        </Button>
      </div>
      <GoogleButton title="Sign up with Google" />
    </React.Fragment>
  );
};

export default LoginPage;
