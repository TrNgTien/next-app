import { NavigationPath } from '@/common';
import { GoogleButton } from '@/components';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FLEX_COL_STYLE, INPUT_STYLE } from '@/styles';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import GoogleLogin from 'react-google-login';

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

  const handleGoogleResponse = (googleRes) => {
    console.log('googleRes', googleRes);
  };

  const handleGoogleError = (err) => {
    console.error('--- Error when tried to login by Google ---');
    console.error(err);
    // removeCookie("code");
  };
  const handleSignUp = useCallback(() => {}, []);

  return (
    <React.Fragment>
      <div className="mt-24 mb-10 pl-8">
        <h1 className="text-4xl">Sign Up</h1>
      </div>
      <div className={FLEX_COL_STYLE}>
        <input
          placeholder="Phone Number"
          className={INPUT_STYLE}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          className={INPUT_STYLE}
          onChange={handleChange}
        />
        <input
          placeholder="First Name"
          className={INPUT_STYLE}
          onChange={handleChange}
        />
        <input
          placeholder="Last Name"
          className={INPUT_STYLE}
          onChange={handleChange}
        />
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
      <GoogleLogin
        clientId={
          '508265428311-ge3tcmlnttif3cinco22s2rbflq1bc5q.apps.googleusercontent.com'
        }
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            title="Sign Up with Google"
          />
        )}
        buttonText="Sign in with Google"
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleError}
        cookiePolicy={'single_host_origin'}
      />
    </React.Fragment>
  );
};

export default SignUpPage;
