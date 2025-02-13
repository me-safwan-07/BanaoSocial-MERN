import React, { useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { saveTokenToLocalStorage, signupUser } from '@/utils/authAPI';
import { PasswordInput } from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import { GoogleButton } from '@/components/GoogleButton';

interface TSignUpFormState {
    name: string;
    email: string;
    password: string;
}

function SignupOptions() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const formMethods = useForm<TSignUpFormState>();
    const [password, setPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

     const [signingUp, setSigningUp] = useState(false);

    const onSubmit = async (data: TSignUpFormState) => {
        setSigningUp(true);

        try {
            const token = await signupUser(data);
            if (token) {
                saveTokenToLocalStorage(token);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSigningUp(false);
        }
    }

  return (
    <div>
        <FormProvider {...formMethods}>
            
            <form onSubmit={formMethods.handleSubmit(onSubmit)}> 
                <div>
                    <div className="mb-2 transition-all duration-500 ease-in-out">
                        <label htmlFor="email" className='sr-only'>Full Name</label>
                        <div className="mt-1">
                            <input
                                type="text" 
                                autoComplete='given-name'
                                placeholder='Full Name' 
                                aria-placeholder='Full Name'
                                required
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                {...formMethods.register("name", {
                                    required: true,
                                    pattern: /^[a-zA-Z]+$/,
                                })}
                            />
                        </div>
                    </div>


                    <div className="mb-2 transition-all duration-500 ease-in-out">
                        <label htmlFor="email" className='sr-only'>Email address</label>
                        <div className="mt-1">
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                placeholder='example@gmail.com'
                                defaultValue={searchParams.get('email') || ''}
                                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                {...formMethods.register("email", {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })}
                            />
                        </div>
                    </div>

                    <div className="transition-all duration-500 ease-in-out">
                        <label htmlFor="password" className="sr-only">Password</label>
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

                    <div className="mt-3 text-center text-xs text-slate-500">
                        <Link 
                            to="/auth/forgot-password"
                            className='font-semibold text-slate-600 underline hover:text-slate-700'
                            >
                            Forgot your password?
                        </Link>
                    </div>

                </div>
                <Button
                  type="submit"
                  variant="darkCTA"
                  onClick={() => {
                    formMethods.handleSubmit(onSubmit)
                  }}
                  className="w-full justify-center bg-black text-white my-3">
                  Continue with Email
                </Button>
            </form>
            {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
              <GoogleButton />
            {/* </GoogleOAuthProvider> */}
        </FormProvider>
    </div>
  )
}

export default SignupOptions
