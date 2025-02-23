import { FiUser } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useToast } from "@/hooks/use-toast";
import { IoSettingsOutline } from "react-icons/io5";
import { LuUserCog } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/authActions";

const UserProfile = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
    const { toast } = useToast();
    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <div className="profile-trigger">
                        <FiUser className="text-xl" />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div
                        className="flex items-center space-x-2">
                        <LuUserCog className="text-xl text-gray-700 dark:text-white text-foreground" />
                        <span>Profile</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div
                        className="flex items-center space-x-2">
                        <IoSettingsOutline className="text-xl text-gray-700 dark:text-white text-foreground" />
                        <span>Settings</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <div
                        className="flex items-center space-x-2"
                        onClick={() => {
                            dispatch(logout());
                            navigate('/auth/signin');
                            toast({
                                message: "Success",
                                description: "Logged out successfully",
                            });
                        }}
                    >
                        <MdLogout className="text-xl text-gray-700 dark:text-white text-foreground" />
                        <span>Log out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfile;
