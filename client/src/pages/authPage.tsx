import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Signup from '@/components/signup';
import Login from '@/components/login';
import ForgotPassword from '@/components/forgot-password';
import EmailSent from '@/components/EmailSent';
import Sucess from '@/components/success';
import Reset from '@/components/reset';
// import SignIn from '@/test/signIn';
// import SignUp from '@/test/signup';
// import Signup from '@/components/signup';
// import Login from '@/components/login';

function AuthPage() {
  return (
    <>
        <Toaster />
        <div className="min-h-screen bg-slate-50">
            <div className="isolate bg-white">
                <div className="bg-gradient-radial min-h-screen from-slate-200 to-slate-50">
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/email-sent' element={<EmailSent />} />
                        <Route path='/reset-password' element={<Reset />} />
                        <Route path='/forgot-password/reset/success' element={<Sucess />} />
                    </Routes>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthPage

