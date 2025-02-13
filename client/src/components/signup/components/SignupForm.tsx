import { Link } from 'react-router-dom';
import SignupOptions from './SignupOptions';

export const SignupForm = () => {
  return (
    <div className='text-center'>
        <h1 className='mb-4 text-slate-700'>Create an account</h1>
        <SignupOptions />
        <div className="mt-3 text-center text-xs text-slate-500">
            By signing up, you agree to our
            <br />
            <Link to="/auth/terms" target='_blank' rel='noreferrer' className='font-semibold'>Terms of Service</Link>
            <span> and </span>
            <Link to="/auth/privacy" target='_blank' rel='noreferrer' className='font-semibold'>Privacy Policy</Link>
            <hr className='mx-6 mt-3'></hr>
        </div>

        <div className="mt-9 text-center text-xs">
            <span className="leading-5 text-slate-500">Have an account?</span>
            <br />
            <Link 
                to="/auth/login" 
                className='font-semibold text-slate-600 underline hover:text-slate-700'>
                    Login
            </Link>
        </div>
    </div>
  )
};