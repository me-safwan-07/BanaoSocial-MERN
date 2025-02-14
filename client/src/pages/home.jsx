import Navbar from "../components/Global/Navbar";
import PostForm from "../components/Global/PostForm";
import { useState, useEffect } from "react";
import { fetchPosts } from "@/redux/post/post.slice";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { selectUserToken } from "@/redux/user/user.selector";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
    const [open, setOpen] = useState(false);
    const token = useSelector(selectUserToken);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(token));
    }, [dispatch, token]);

    return (
        <div className="flex-col-center bg-">
            <Navbar />
            <div className="relative top-[100px] flex flex-col items-center gap-6 px-4">
                <div className="flex flex-wrap justify-center gap-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="w-full sm:w-auto">
                            <Button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">
                                Create New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[90vw] sm:max-w-[70vw] md:max-w-[50vw] lg:max-w-[40vw] backdrop-blur-md rounded-lg shadow-2xl p-6">
                            <DialogHeader>
                                <DialogTitle>
                                    <span className="text-2xl font-bold">Create New Post</span>
                                </DialogTitle>
                                <DialogDescription className="text-gray-500">
                                    Fill in the following information to create a new post.
                                </DialogDescription>
                            </DialogHeader>
                            <PostForm setOpen={setOpen} />
                        </DialogContent>
                    </Dialog>

                    <Button className="px-6 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-lg hover:bg-gray-900 hover:scale-105 transition-transform duration-200">
                        <Link to="/my-posts">My Posts</Link>
                    </Button>
                </div>
            </div>
            <div className="w-full sm:w-3/4 md:w-1/2 flex justify-center mt-10 px-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Home;
