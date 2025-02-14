import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { PasswordInput } from "@/components/ui/PasswordInput";
import Button from "@/components/ui/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "@/redux/user/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { FormProvider, useForm } from "react-hook-form";

interface TResetPasswordFormState {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formMethods = useForm<TResetPasswordFormState>({
    defaultValues: {
      email: searchParams.get('email') || '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: TResetPasswordFormState) => {
    setLoading(true);

    const { newPassword, confirmPassword, email } = data;

    if (!newPassword || !confirmPassword) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    dispatch(resetPassword({ email, newPassword }))
      .unwrap()
      .then(() => {
        navigate("/auth/forgot-password/reset/success");
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
              <h3 className="text-sm font-medium text-red-800">An error occurred</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-800">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                placeholder="example@gmail.com"
                {...formMethods.register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-slate-800">
                New password
              </label>
              <PasswordInput
                id="newPassword"
                {...formMethods.register("newPassword", { required: true })}
                autoComplete="new-password"
                placeholder="*******"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-800">
                Confirm password
              </label>
              <PasswordInput
                id="confirmPassword"
                {...formMethods.register("confirmPassword", { required: true })}
                autoComplete="new-password"
                placeholder="*******"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="darkCTA" className="w-full justify-center" loading={loading}>
              Reset password
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
