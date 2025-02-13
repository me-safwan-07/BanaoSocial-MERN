import React, { useRef, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
// import { login } from '@/hooks/authHooks';
import { PasswordInput } from '@/components/ui/PasswordInput';
// import { GoogleButton } from '@/components/ui/SignupOptions/components/GoogleButton';
import Button from '@/components/ui/Button';
// import { cn } from '@/lib/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleButton } from '@/components/GoogleButton';

interface TSignInFormState {
  email: string;
  password: string;
}

export const SigninForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailRef = useRef<HTMLInputElement>(null);
  const formMethods = useForm<TSignInFormState>();

  const fromLabel = 'Login to your account';

  const onSubmit = async(data: TSignInFormState) => {
    setLoggingIn(true);

    // try {
    //   const token = await login(data);
    //   if (token) {
    //     localStorage.setItem("token", token);
    //     navigate("/");
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setLoggingIn(false);
    // }
  }

  const [loggingIn, setLoggingIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  // const [totpLogin, setTotpLogin] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div>
      <FormProvider {...formMethods}>
        <div className="text-center">
          <h1 className="mb-4 text-slate-700">{fromLabel}</h1>
          <div className="space-y-2">
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              {showLogin && (
                <div>
                <div className="mb-2 transition-all duration-500 ease-in-out">
                <label htmlFor="email" className='sr-only'>Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="example@email.com"
                  defaultValue={searchParams?.get("email") || ""}
                  className="p-2 focus:border-blue-300 focus:ring-brand block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                  {...formMethods.register("email", {
                    required: true,
                    pattern: /\S+@\S+\.\S+/,
                  })}
                  />
              </div>
              <div className="">
                <label htmlFor="password" className='sr-only'>Password</label>
                <Controller 
                  name="password"
                  control={formMethods.control}
                  render={({ field }) => (
                    <PasswordInput 
                    id='password'
                    autoComplete='current-password'
                    placeholder='********'
                    aria-placeholder='password'
                    onFocus={() => setIsPasswordFocused(true)}
                    required
                    className=''
                    {...field}
                    />
                  )}
                  rules={{
                    required: true,
                  }}
                />
              </div>
              {isPasswordFocused && (
                  <div className="ml-1 text-right transition-all duration-500 ease-in-out">
                  <Link
                    to="/auth/forgot-password"
                    className="hover:text-blue-500 text-xs text-slate-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
              </div>
            )}

              <Button
                onClick={() => {
                  if (!showLogin) {
                      setShowLogin(true);
                      setTimeout(() => emailRef.current?.focus(), 100);
                    } else if (formRef.current){
                      formRef.current.requestSubmit();
                    }
                  }}
                  variant='darkCTA'
                  className='w-full justify-center'
                  loading={loggingIn}
                >
                  Login with Email
              </Button>
            </form>
            {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
              <GoogleButton />
            {/* </GoogleOAuthProvider> */}
        
            <div className='mt-9 text-center text-xs'>
              <span className='leading-5 text-slate-500'>New to PlayForm?</span>
              <br />
              <Link to="/auth/signup"
                className='font-semibold text-slate-600 underline hover:text-slate-700'
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  )
};
