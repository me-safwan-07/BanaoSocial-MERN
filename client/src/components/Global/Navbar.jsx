import Logo from "../shared/Logo";
import ThemeSelector from "../shared/themeSelector";
import { FaRegBell } from "react-icons/fa";
import UserProfile from "../shared/userProfile";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
    return (
        <div className="fixed bg-background top-0 left-0 w-full flex gap-4 items-center px-4 py-2 text-gray-700 dark:text-white shadow-sm border">
            <Logo />
            <div className="flex space-x-6 ml-auto mr-[30px]">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <ThemeSelector />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Change Theme</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FaRegBell className="text-lg" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Notifications</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <UserProfile />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>User</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Navbar;
