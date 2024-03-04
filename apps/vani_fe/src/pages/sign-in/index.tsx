import eyesClose from '@/assets/icons/eye-close.svg';
import eyesOpen from '@/assets/icons/eye-open.svg';
import { NavigationPath } from '@/common';
import { GoogleButton } from '@/components';
import { cn } from '@/lib/utils';
import { FLEX_COL_STYLE, INPUT_STYLE } from '@/styles';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const SignInPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <React.Fragment>
      <div className="mt-24 mb-10 pl-8">
        <h1 className="text-4xl">Sign In</h1>
      </div>

      <div className={FLEX_COL_STYLE}>
        <input
          placeholder="Phone Number or User Name"
          type="text"
          className={INPUT_STYLE}
        />
        <div className="relative w-10/12 mb-10 mx-auto my-2">
          <input
            placeholder="Password"
            type={!isShow ? 'password' : 'text'}
            className="absolute border-solid border-2 rounded-md w-full p-2"
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

      <div className={cn(FLEX_COL_STYLE, 'w-full mx-auto items-center')}>
        <Link href={NavigationPath.SIGN_UP} className="mt-6">
          Don&apos;t have an account?
        </Link>
        <Link
          href={`${NavigationPath.QUIZ}/1`}
          className="rounded-md bg-black text-white w-10/12 mx-auto my-2 p-3 text-center">
          <p>Sign in</p>
        </Link>
      </div>

      <GoogleButton title={'Sign in with Google'} isSignUp={false} />
    </React.Fragment>
  );
};

export default SignInPage;
