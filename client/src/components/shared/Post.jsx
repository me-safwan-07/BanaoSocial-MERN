/* eslint-disable react/prop-types */
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createLocalComment, createComment } from "@/redux/post/post.slice";
import { selectUserInfo, selectUserToken } from "@/redux/user/user.selector";
import { createInteraction } from "@/redux/post/post.slice";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    // MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    // DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deletePost } from "@/redux/post/post.slice";
import PostForm from "../Global/PostForm";
import { cn } from "@/lib/utils";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

const Post = ({ post, ...otherPorps }) => {
    const [postDelete, setPostDeleted] = useState(false);
    const [open, setOpen] = useState(false);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [dislikeCount, setDislikeCount] = useState(post.dislikes);
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectUserToken);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const dispatch = useDispatch();

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createLocalComment({
                postId: post._id,
                content: comment,
                owner: userInfo,
            })
        );
        dispatch(
            createComment({
                postId: post._id,
                content: comment,
                jwtToken: token,
            })
        );
        setComment("");
    };

    useEffect(() => {
        setLikeCount(post.likes);
        setDislikeCount(post.dislikes);
    }, [post.likes, post.dislikes]);

    useEffect(() => {
        if (post.interactions.length === 0) return;
        post.interactions.find((interaction) => {
            if (interaction.owner === userInfo._id) {
                if (interaction.type === "like") {
                    setLike(true);
                    setDislike(false);
                } else if (interaction.type === "dislike") {
                    setDislike(true);
                    setLike(false);
                }
            }
        });
    }, [post.interactions, userInfo._id]);

    return (
        // <div {...otherPorps} className={`${postDelete ? "hidden" : ""} w-full mt-2 border-b`}>
        <div {...otherPorps} 
            className={cn(
                { hidden: postDelete },
                "w-full max-w-2xl mx-auto ",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "rounded-3xl shadow-xl"
            )}  
        >
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <div className="p-3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <FiUser className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-800" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {post.owner.name}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Few moments ago</p>
                        </div>

                        <Menubar  className="-p-2 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                            <MenubarMenu className="bg-transparent">
                                <MenubarTrigger className="bg-transparent rounded-full py-2">
                                    <BsThreeDots className="text-lg bg-transparent rounded-ful" />
                                </MenubarTrigger>
                                <MenubarContent className="bg-transparent min-w-[8rem] w-fit ">
                                    <MenubarItem>
                                        <div className="flex-center gap-2">
                                            <FaRegShareFromSquare className="text-md" />
                                            <span>Share</span>
                                        </div>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <div className="flex-center gap-2">
                                            <IoBookmarkOutline className="text-md" />
                                            <span>Save</span>
                                        </div>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <div className="flex-center gap-2">
                                            <MdReportGmailerrorred className="text-md" />
                                            <span>Report</span>
                                        </div>
                                    </MenubarItem>
                                    {userInfo._id === post.owner._id && (
                                        <>
                                            <MenubarSeparator />
                                            {/* <MenubarItem> */}
                                                <Dialog
                                                    open={open}
                                                    onOpenChange={setOpen}
                                                    >
                                                    <DialogTrigger className="">
                                                        <div className="flex-center gap-2 ml-2">
                                                            <FiEdit className="text-sm" />
                                                            <span className="text-sm">Edit</span>
                                                        </div>
                                                    </DialogTrigger>
                                                    <DialogContent className="w-fit max-w-[70vw]">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <span className="text-2xl">
                                                                    Create New Post
                                                                </span>
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Fill in the
                                                                following
                                                                information to
                                                                create a new post
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <PostForm
                                                        setOpen={setOpen}
                                                        post={post}
                                                        type="edit"
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                            {/* </MenubarItem> */}
                                            <MenubarItem>
                                                <div
                                                    className="flex-center gap-2"
                                                    onClick={() => {
                                                        dispatch(
                                                            deletePost({
                                                                postId: post._id,
                                                                jwtToken: token,
                                                            })
                                                        )
                                                        setPostDeleted(true);
                                                    }}
                                                >
                                                    <FaRegTrashCan className="text-md" />
                                                    <span>Delete</span>
                                                </div>
                                            </MenubarItem>
                                        </>
                                    )}
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className="px-6">
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">{post.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {post.content}
                </p>
            </div>
            
            <div className="flex-center w-fit gap-10 px-6">
                <div className="flex-center w-fit gap-4">
                    <button
                        onClick={() => {
                            setLike(!like);
                            if (dislike) {
                                setDislike(false);
                                setDislikeCount(dislikeCount - 1);
                            }
                            setLikeCount(
                                like ? likeCount - 1 : likeCount + 1
                            );
                            dispatch(
                                createInteraction({
                                    postId: post._id,
                                    type: "like",
                                    jwtToken: token,
                                })
                            );
                        }}
                        className={cn(
                            "flex items-center gap-2 text-sm transition-colors",
                            like
                              ? "text-rose-600"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600"
                          )}
                    >
                        <Heart
                            className={cn(
                                "w-5 h-5 transition-all",
                                like && "fill-current scale-110"
                            )}
                        />
                        {/* {like ? (
                            <AiFillLike className="text-xl" />
                        ) : (
                            <AiOutlineLike className="text-xl" />
                        )} */}
                        <span>{likeCount}</span>
                    </button>
                </div> 
                <button
                    className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors"
                    onClick={() => setCommentOpen(!commentOpen)}
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                </button>
                <button
                    type="button"
                    // onClick={onShare}
                    className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-green-500 transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                    <span>0</span>
                </button>
            <div className="flex justify-end items-end">

                <button
                    type="button"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={cn(
                        "p-2 rounded-full transition-all",
                        isBookmarked
                        ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10" 
                        : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    )}
                    >
                    <Bookmark className={cn(
                        "w-5 h-5 transition-transform",
                        isBookmarked && "fill-current scale-110"
                    )} />
                </button>
                </div>
            </div>

            {commentOpen && (
                <div className="w-full p-4 pt-0">
                    <form
                        className="flex-center gap-4"
                        onSubmit={handleCommentSubmit}
                    >
                        <Input
                            value={comment}
                            type="text"
                            placeholder="Comment"
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button type="submit">Post</Button>
                    </form>
                    <hr className="border mt-4" />
                    <div className="w-full h-[250px] overflow-auto">
                        {post.comments.length > 0 ? (
                            <div className="flex-col-center pt-4 pb-2 gap-2">
                                {post.comments.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-1 w-[95%] shadow-sm px-4 py-2 rounded-lg border"
                                    >
                                        <div className="flex-between">
                                            <div className="flex-center w-fit gap-2">
                                                <div className="rounded-full overflow-hidden border shadow-sm p-1 w-fit">
                                                    <FiUser className="text-xl" />
                                                </div>
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-md font-semibold">
                                                        {comment.owner.name}
                                                    </span>
                                                    <span className="text-[11px] mt-[-4px]">
                                                        Few moments ago
                                                    </span>
                                                </div>
                                            </div>
                                            <BsThreeDots className="text-lg" />
                                        </div>
                                        <div>
                                            <p className="ml-4  leading-[14px] text-sm">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-col-center h-full w-full">
                                <img
                                    src="/noComents.png"
                                    alt=""
                                    className="w-[150px]"
                                />
                                <p className="text-xl">There are no comment</p>
                                <p className="text-xs">
                                    Be the first one to comment
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
