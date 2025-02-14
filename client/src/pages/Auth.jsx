import ThemeSelector from "../components/shared/themeSelector";
import Logo from "../components/shared/Logo";
import { Outlet } from "react-router-dom";

const Auth = () => {
    
    return (
        <div className="flex flex-col items-start justify-center h-screen bg-[url('/bgSign.svg')] dark:bg-[url('/bgSign2.svg')]  bg-cover bg-center">
            <div className="absolute bottom-4 left-4">
                <ThemeSelector />
            </div>
            <div className="absolute top-4 left-4">
                <Logo />
            </div>
            <Outlet />
        </div>
    );
};

export default Auth;
