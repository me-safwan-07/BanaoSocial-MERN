import { useState } from "react";
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
import emailJs from "@emailjs/browser";

const ForgotPassword = () => {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        email: "",
    });

    const reset = () => {
        setFormData({
            ...formData,
            email: "",
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const responce = await fetch(
            `${import.meta.env.VITE_SERVER_URI}/api/auth/forgot-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );
        if (responce.ok) {
            const result = await responce.json();
            emailJs.init({
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            });
            const templateParams = {
                to_name: result.data.name,
                to_email: result.data.email,
                link: `${import.meta.env.VITE_SERVER_URI}/api/auth/verify?token=${result.data.token}`,
            };
            emailJs
                .send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    templateParams
                )
                .then(() => {
                    toast({
                        title: "Success 🎉",
                        description: "Email sent successfully",
                    });
                    reset();
                })
                .catch((error) => {
                    console.error("Failed to send email. Error:", error);
                    toast({
                        variant: "destructive",
                        title: "Error ⚠️",
                        description: "Failed to send email",
                    });
                });
        } else {
            const error = await responce.json();
            toast({
                variant: "destructive",
                title: "Error ⚠️",
                description: error.message,
            });
        }
    };
    return (
        <>
            <Card className="w-[350px] ml-[250px]">
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        We will send you a magic link to reset your password.
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
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={reset}>
                        Reset
                    </Button>
                    <Button form="form" type="submit">
                        Get Magic Link
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

export default ForgotPassword;
