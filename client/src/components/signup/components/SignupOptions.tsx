import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { PasswordInput } from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import { signUp } from '@/redux/user/user.slice';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';

interface TSignUpFormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string; 
}

function SignupOptions() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const formMethods = useForm<TSignUpFormState>();
    const dispatch = useDispatch<AppDispatch>();
    const [signingUp, setSigningUp] = useState(false);
    const { toast } = useToast();

    // Handle form submission
    const onSubmit = async (data: TSignUpFormState) => {
        setSigningUp(true);
        // Check if passwords match
        if (data.password === data.confirmPassword) {
            dispatch(signUp(data))
                .unwrap()
                .then(() => {
                    toast({
                        message: "Success 🎉",
                        description: "Signed up successfully",
                    });
                    navigate("/");
                })
                .catch((error: { message: string }) => {
                    toast({
                        variant: "destructive",
                        message: "Error ⚠️",
                        description: error.message,
                    });
                    console.log(error);
                });
        } else {
            toast({
                variant: "destructive",
                message: "Error",
                description: "Password and confirm password should match",
            });
        }
        setSigningUp(false);
    };

    return (
        <div>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 transition-all duration-500 ease-in-out">
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    autoComplete="given-name"
                                    placeholder="Full Name"
                                    required
                                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    {...formMethods.register("name", { required: true, pattern: /^[a-zA-Z]+$/ })}
                                />
                            </div>
                        </div>

                        <div className="mb-2 transition-all duration-500 ease-in-out">
                            <label htmlFor="email" className="sr-only">Email Address</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="example@gmail.com"
                                    defaultValue={searchParams.get('email') || ''}
                                    className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                    {...formMethods.register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                                />
                            </div>
                        </div>

                        <div className="transition-all duration-500 ease-in-out mb-2">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Controller
                                name="password"
                                control={formMethods.control}
                                render={({ field }) => (
                                    <PasswordInput
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="********"
                                        // onFocus={() => setIsPasswordFocused(true)}
                                        required
                                        className=""
                                        {...field}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </div>

                        <div className="transition-all duration-500 ease-in-out">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <Controller
                                name="confirmPassword"
                                control={formMethods.control}
                                render={({ field }) => (
                                    <PasswordInput
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        placeholder="********"
                                        // onFocus={() => setIsPasswordFocused(true)}
                                        required
                                        className=""
                                        {...field}
                                    />
                                )}
                                rules={{ required: true }}
                            />
                        </div>

                        <div className="mt-3 text-center text-xs text-slate-500">
                            <Link
                                to="/auth/forgot-password"
                                className="font-semibold text-slate-600 underline hover:text-slate-700"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="darkCTA"
                            className="w-full justify-center bg-black text-white my-3"
                            disabled={signingUp} // Disable button while submitting
                        >
                            {signingUp ? 'Signing Up...' : 'Continue with Email'}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default SignupOptions;
