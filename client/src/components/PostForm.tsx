/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    // CardDescription,
    CardFooter,
    // CardHeader,
    // CardTitle,
} from "../components/ui/card";
import { selectUserToken } from "@/redux/user/user.selector";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/redux/post/post.slice";
import { MdOutlineCancel } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { updatePost } from "@/redux/post/post.slice";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Button from "./ui/Button";
import { AppDispatch } from "@/redux/store";

interface PostFormProps {
    setOpen: (open: boolean) => void;
    post?: {
        _id: string;
        title: string;
        content: string;
        tags: string[];
    };
    type: 'edit' | 'create';
}

const PostForm = ({ setOpen, post, type }: PostFormProps) => {
    const [tag, setTag] = useState("");
    const { toast } = useToast();
    const token = useSelector(selectUserToken);
    const dispatch = useDispatch<AppDispatch>();

    interface PostFormData {
        title: string;
        content: string;
        tags: string[];
    }
    
    const [formData, setFormData] = useState<PostFormData>({
            title: "",
            content: "",
            tags: [],
        });

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content,
                tags: post.tags,
            });
        }
    }, [post]);

    const reset = () => {
        setFormData({
            title: "",
            content: "",
            tags: [],
        });
    };

    interface ToastConfig {
        message: string;
        description: string;
        variant?: 'success' | 'error';
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (type === "edit" && post) {
            dispatch(updatePost({ formData, token, postId: post._id }))
                .unwrap()
                .then(() => {
                    toast({
                        message: "Success",
                        description: "Post updated successfully",
                        variant: "success",
                    } as ToastConfig);
                    setOpen(false);
                    reset();
                })
                .catch(() => {
                    toast({
                        message: "Error",
                        description: "An error occurred",
                        variant: "error",
                    } as ToastConfig);
                    setOpen(false);
                });
        } else {
            dispatch(createPost({ formData, token }))
                .unwrap()
                .then(() => {
                    toast({
                        message: "Success",
                        description: "Post created successfully",
                        variant: "success",
                    } as ToastConfig);
                    setOpen(false);
                    reset();
                })
                .catch(() => {
                    toast({
                        message: "Error",
                        description: "An error occurred",
                    } as ToastConfig);
                    setOpen(false);
                });
        }
    };

    return (
        <Card className="w-[550px] shadow-none border-none p-0 m-0">
            <CardContent className={`flex flex-col gap-4`}>
                <form id="post-form" onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                placeholder="Your full name"
                                required
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                required
                                placeholder="Post content..."
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        content: e.target.value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </form>
                <form
                    id="tag-form"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const input = form.elements[0] as HTMLInputElement;
                        setFormData({
                            ...formData,
                            tags: [...formData.tags, input.value],
                        });
                        setTag("");
                    }}
                >
                    <div className="flex-center gap-2">
                        <Input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Enter tags..."
                            required
                        />
                        <Button
                            form="tag-form"
                            type="submit"
                            className={`bg-secondary text-foreground hover:text-white`}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex gap-2 my-2 w-full flex-wrap max-h-[100px] overflow-auto">
                        {formData.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                className="bg-secondary text-foreground flex-center gap-2 w-fit"
                            >
                                <span>{tag}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            tags: formData.tags.filter(
                                                (t) => t !== tag
                                            ),
                                        });
                                    }}
                                >
                                    <MdOutlineCancel className="text-lg text-gray-700" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="secondary" onClick={reset}>
                    Reset
                </Button>
                <Button form="post-form" type="submit">
                    {
                        type === "edit"
                            ? "Update Post"
                            : "Create Post"
                    }
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PostForm;
