import { signUp } from "../redux/user/user.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const reset = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            dispatch(signUp(formData))
                .unwrap()
                .then(() => {
                    toast({
                        title: "Success 🎉",
                        description: "Singed in successfully",
                    });
                    navigate("/auth/signin");
                    reset();
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Error ⚠️",
                        description: error.message,
                    });
                    console.log(error);
                });
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Password and confirm password should match",
            });
        }
    };
    return (
        <>
            <Card className="w-[350px] ml-[250px]">
                <CardHeader>
                    <CardTitle>Create New Account</CardTitle>
                    <CardDescription>
                        Join us today and start exploring the world 😊
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    placeholder="Your full name"
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    required
                                    placeholder="Your email"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    required
                                    placeholder="password"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Confirm password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    required
                                    placeholder="Re-enter your password"
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={reset}>
                        Reset
                    </Button>
                    <Button form="form" type="submit">Sign Up</Button>
                </CardFooter>
            </Card>
            <div className="ml-[250px] text-center w-[350px] mt-8">
                <span>
                    Already have and account?
                    <Link
                        to={"/auth/signin"}
                        className=" underline font-semibold text-primary"
                    >
                        SignIn
                    </Link>
                </span>
            </div>
        </>
    );
};

export default SignUp;
