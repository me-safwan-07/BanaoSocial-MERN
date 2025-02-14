import { useState, useEffect } from "react";
import { fetchPosts } from "@/redux/post/post.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    // DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { selectUserToken } from "@/redux/user/user.selector";
import { Link, Outlet } from "react-router-dom";
import Button from "@/components/ui/Button";
import PostForm from "@/components/PostForm";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";

const Post = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(selectUserToken);

    useEffect(() => {
        dispatch(fetchPosts(token));
    }, [dispatch, token]);

    return (
        <div className="flex-col-center">
            <Navbar />
            <div className="absolute top-[100px] left-10">
                <div className="flex-col-center w-[140px] gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger className="w-full">
                            <Button>Create New Post</Button>
                        </DialogTrigger>
                        <DialogContent className="w-fit max-w-[70vw]">
                            <DialogHeader>
                                <DialogTitle>
                                    <span className="text-2xl">
                                        Create New Post
                                    </span>
                                </DialogTitle>
                                <DialogDescription>
                                    Fill in the following information to create
                                    a new post
                                </DialogDescription>
                            </DialogHeader>

                            <PostForm setOpen={setOpen} type="create" />
                        </DialogContent>
                    </Dialog>
                    <Button className="w-[98%]">
                        <Link to="/my-posts">My Posts</Link>
                    </Button>
                </div>
                <Main />
            </div>
            <Outlet />
        </div>
    );
};

export default Post;
