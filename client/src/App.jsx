import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import { selectThemeMode } from "./redux/theme/theme.selector";
import { useSelector } from "react-redux";
import Home from "./pages/home";
import { selectUserToken } from "./redux/user/user.selector";

import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import Main from "./components/Global/Main";
import MyPosts from "./components/Global/MyPosts";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailSent from "./pages/EmailSent";

function App() {

    const token = useSelector(selectUserToken);
    const theme = useSelector(selectThemeMode);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return (
        <div className="">

        <Routes>
            <Route path="auth/*" element={<Auth />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="/" element={token === "" ? <Navigate to={'/auth/signin'} /> : <Home />} >
                <Route index element={<Main />} />
                <Route path="my-posts" element={<MyPosts />} />
            </Route>
        </Routes>
        </div>
    );
}

export default App;
