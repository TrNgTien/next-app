import { NavigationPath } from '@/common';
import { GoogleButton } from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FLEX_COL_STYLE, INPUT_STYLE } from '@/styles';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

const SignUpPage = () => {
  const [userInfo, setUserInfo] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = useCallback((e) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }, []);

  const handleSignUp = useCallback(() => {}, []);

  return (
    <React.Fragment>
      <div className="mt-24 mb-10 pl-8">
        <h1 className="text-4xl">Sign Up</h1>
      </div>
      <div className={FLEX_COL_STYLE}>
        <input placeholder="Phone Number" className={INPUT_STYLE} />
        <input placeholder="Password" className={INPUT_STYLE} />
        <input placeholder="First Name" className={INPUT_STYLE} />
        <input placeholder="Last Name" className={INPUT_STYLE} />
      </div>
      <div className={cn(FLEX_COL_STYLE, 'w-full mx-auto items-center')}>
        <Link href={NavigationPath.SIGN_IN} className="mt-6 my-2">
          Already have an account?
        </Link>
        <Button
          onClick={handleSignUp}
          className="border bg-black text-white w-10/12 mx-auto p-4"
          variant="outline">
          Sign up
        </Button>
      </div>
      <GoogleButton title="Sign up with Google" />
    </React.Fragment>
  );
};

export default SignUpPage;
