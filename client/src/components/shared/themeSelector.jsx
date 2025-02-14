import { setTheme } from "@/redux/theme/theme.slice";
import { useDispatch } from "react-redux";
import { themes } from "@/constants/contants";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { PiPaintBrushBroadFill } from "react-icons/pi";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";

export default function ThemeSelector() {
    const dispatch = useDispatch();
    const changeTheme = (theme) => {
        dispatch(setTheme(theme));
    };
    return (
        <Menubar className="border-none m-0 p-0">
            <MenubarMenu >
                <MenubarTrigger><PiPaintBrushBroadFill className="text-xl"/></MenubarTrigger>
                <MenubarContent>
                    {themes.map((theme) => (
                        <MenubarItem key={theme.value} onClick={() => changeTheme(theme.value)}>
                            <div className="flex-center">
                                {theme.value === "light" && <IoSunny />}
                                {theme.value === "dark" && <FaMoon />}
                                {theme.value === "system" && <RiComputerLine />}
                                <span className="ml-2">{theme.name}</span>
                            </div>
                        </MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
