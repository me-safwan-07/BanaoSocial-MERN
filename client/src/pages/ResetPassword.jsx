import { resetPassword } from "../redux/user/user.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });

    const reset = () => {
        setFormData({
            ...formData,
            email: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.newPassword !== formData.confirmPassword) {
            toast({
                variant: "destructive",
                title: "Error ⚠️",
                description: "Passwords do not match",
            });
        } else {
            dispatch(resetPassword(formData))
                .unwrap()
                .then(() => {
                    toast({
                        title: "Success 🎉",
                        description: "Password changed successfully",
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
        }
    };
    return (
        <>
            <Card className="w-[350px] ml-[250px]">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                    <CardDescription>
                        create a new password for your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form" onSubmit={handleSubmit} className="mb-2">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="new password">
                                    New password
                                </Label>
                                <Input
                                    id="new password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={formData.newPassword}
                                    required
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            newPassword: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirm password">
                                    Confirm password
                                </Label>
                                <Input
                                    id="confirm password"
                                    type="password"
                                    value={formData.confirmPassword}
                                    placeholder="Re-enter your new password"
                                    required
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
                    <Button form="form" type="submit">
                        Reset password
                    </Button>
                </CardFooter>
            </Card>
            <div className="ml-[250px] text-center w-[350px] mt-8">
                <span>
                    Don&apos;t have an account?
                    <Link
                        to={"/auth/signup"}
                        className=" underline font-semibold text-primary"
                    >
                        SignUp
                    </Link>
                </span>
            </div>
        </>
    );
};

export default ResetPassword;
