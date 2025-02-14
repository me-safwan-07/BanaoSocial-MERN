import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit, FiUser } from "react-icons/fi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoBookmarkOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { useEffect, useState, FormEvent } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { createLocalComment, createComment, createInteraction, deletePost } from "@/redux/post/post.slice";
import { selectUserInfo, selectUserToken } from "@/redux/user/user.selector";
import { AppDispatch } from "@/redux/store";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PostForm from "./PostForm";
import { Input } from "./ui/input";
import Button from "./ui/Button";

interface CommentOwner {
    name: string;
    _id: string;
}

interface Comment {
    owner: CommentOwner;
    content: string;
}

interface PostProps {
    post: {
        _id: string;
        owner: CommentOwner;
        title: string;
        content: string;
        likes: number;
        dislikes: number;
        comments: Comment[];
        interactions: { owner: string; type: "like" | "dislike" }[];
        tags: string[];
    };
    [key: string]: any; // For other props
}

const Post = ({ post, ...otherProps }: PostProps) => {
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
    const dispatch = useDispatch<AppDispatch>();

    const handleCommentSubmit = (e: FormEvent) => {
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
    }, [post.interactions, userInfo?._id]);

    return (
        <Card {...otherProps} className={`${postDelete ? "hidden" : ""}`}>
            <CardHeader>
                <div className="flex-between">
                    <div className="flex-start gap-4">
                        <div className="rounded-full overflow-hidden border shadow-sm p-2">
                            <FiUser className="text-2xl" />
                        </div>
                        <div>
                            <CardTitle>
                                <span className="text-lg">{post.owner.name}</span>
                            </CardTitle>
                            <p className="text-xs mt-[-1px]">Few moments ago</p>
                        </div>
                    </div>

                    <Menubar className="shadow-none border-none">
                        <MenubarMenu>
                            <MenubarTrigger>
                                <BsThreeDots className="text-lg" />
                            </MenubarTrigger>
                            <MenubarContent className="min-w-[8rem] w-fit">
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
                                        <Dialog open={open} onOpenChange={setOpen}>
                                            <DialogTrigger>
                                                <div className="flex-center gap-2 ml-2">
                                                    <FiEdit className="text-sm" />
                                                    <span className="text-sm">Edit</span>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="w-fit max-w-[70vw]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        <span className="text-2xl">Create New Post</span>
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Fill in the following information to create a new post
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <PostForm setOpen={setOpen} post={post} type="edit" />
                                            </DialogContent>
                                        </Dialog>
                                        <MenubarItem>
                                            <div
                                                className="flex-center gap-2"
                                                onClick={() => {
                                                    dispatch(
                                                        deletePost({
                                                            postId: post._id,
                                                            jwtToken: token,
                                                        })
                                                    );
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
            </CardHeader>
            <CardContent>
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p>{post.content}</p>
            </CardContent>
            <CardFooter>
                <div className="flex-center w-fit gap-10">
                    <div className="flex-center w-fit gap-4">
                        <div
                            className="flex-center gap-1"
                            onClick={() => {
                                setLike(!like);
                                if (dislike) {
                                    setDislike(false);
                                    setDislikeCount(dislikeCount - 1);
                                }
                                setLikeCount(like ? likeCount - 1 : likeCount + 1);
                                dispatch(
                                    createInteraction({
                                        postId: post._id,
                                        type: "like",
                                        jwtToken: token,
                                    })
                                );
                            }}
                        >
                            {like ? (
                                <AiFillLike className="text-xl" />
                            ) : (
                                <AiOutlineLike className="text-xl" />
                            )}
                            <span>{likeCount}</span>
                        </div>
                        <div
                            className="flex-center gap-1"
                            onClick={() => {
                                setDislike(!dislike);
                                if (like) {
                                    setLikeCount(likeCount - 1);
                                    setLike(false);
                                }
                                setDislikeCount(dislike ? dislikeCount - 1 : dislikeCount + 1);
                                dispatch(
                                    createInteraction({
                                        postId: post._id,
                                        type: "dislike",
                                        jwtToken: token,
                                    })
                                );
                            }}
                        >
                            {dislike ? (
                                <AiFillDislike className="text-xl" />
                            ) : (
                                <AiOutlineDislike className="text-xl" />
                            )}
                            <span>{dislikeCount}</span>
                        </div>
                    </div>
                    <div
                        className="flex-center gap-1"
                        onClick={() => setCommentOpen(!commentOpen)}
                    >
                        <GoCommentDiscussion className="text-xl" />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
            </CardFooter>
            {commentOpen && (
                <div className="w-full p-4 pt-0">
                    <form className="flex-center gap-4" onSubmit={handleCommentSubmit}>
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
                                {post.comments.map((comment: Comment, index: number) => (
                                    <div key={index} className="flex flex-col gap-1 w-[95%] shadow-sm px-4 py-2 rounded-lg border">
                                        <div className="flex-between">
                                            <div className="flex-center w-fit gap-2">
                                                <div className="rounded-full overflow-hidden border shadow-sm p-1 w-fit">
                                                    <FiUser className="text-xl" />
                                                </div>
                                                <div className="flex flex-col gap-0">
                                                    <span className="text-md font-semibold">{comment.owner.name}</span>
                                                    <span className="text-[11px] mt-[-4px]">Few moments ago</span>
                                                </div>
                                            </div>
                                            <BsThreeDots className="text-lg" />
                                        </div>
                                        <div>
                                            <p className="ml-4 leading-[14px] text-sm">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-col-center h-full w-full">
                                <img src="/noComents.png" alt="" className="w-[150px]" />
                                <p className="text-xl">There are no comments</p>
                                <p className="text-xs">Be the first one to comment</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default Post;
