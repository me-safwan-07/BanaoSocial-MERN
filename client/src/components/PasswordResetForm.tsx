import React, { useState } from 'react'
import Button from './ui/Button'
import { XCircleIcon } from 'lucide-react';
import emailJs from "@emailjs/browser";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

function PasswordResetForm() {
    const { toast } = useToast();
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
    
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const email = formData.get("email") as string;
    
        const response = await fetch(
            `${import.meta.env.VITE_SERVER_URI}/auth/forgot-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );

        console.log(response);
    
        if (response.ok) {
            const result = await response.json();
            emailJs.init({
                publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            });
    
            const templateParams = {
                to_name: result.data.name,
                to_email: result.data.email,
                link: `${import.meta.env.VITE_SERVER_URI}/auth/verify?token=${result.data.token}`,
            };
    
            emailJs
                .send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
                    templateParams
                )
                .then((): void => {
                    // toast({
                    //     message: "Success 🎉",
                    //     description: "Email sent successfully",
                    // });
                    navigate("/auth/email-sent");
                    
                })
                .catch((error: Error): void => {
                    console.error("Failed to send email. Error:", error);
                    toast({
                        variant: "destructive",
                        message: "Error ⚠️",
                        description: "Failed to send email",
                    });
                });
        } else {
            const error = await response.json();
            setError(error.message);

            toast({
                variant: "destructive",
                message: "Error ⚠️",
                description: error.message,
            });
        }
        setLoading(false);
    };
    
  return (
    <>
        {error && (
            <div className="absolute top-10 rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">An error occurred when logging you in</h3>
                <div className="mt-2 text-sm text-red-700">
                    <p className="space-y-1 whitespace-pre-wrap">{error}</p>
                </div>
                </div>
            </div>
            </div>
        )}
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-800">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="focus:border-[#00e6ca] focus:ring-[#00e6ca] flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
          </div>
        </div>

        <div>
          <Button type="submit" variant="darkCTA" className="w-full justify-center bg-slate-800 text-white" loading={loading}>
            Reset password
          </Button>
          <div className="mt-3 text-center">
            <Button variant="minimal" href="/auth/login" className="w-full justify-center">
              Back to login
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PasswordResetForm