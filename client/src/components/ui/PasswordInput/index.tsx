import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller } from 'react-hook-form';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  containerClassName?: string;
  control: any;
  name: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, containerClassName, control, name, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('');

    const togglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
      <div className={cn("relative", containerClassName)}>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              type={showPassword ? "text" : "password"}
              className={cn(
                "flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              {...rest}
              {...field}
              value={field.value || ''}
              onChange={(e) => {
                field.onChange(e);
                setValue(e.target.value);
              }}
            />
          )}
        />
        <button
          type="button"
          className={cn("absolute right-3 top-1/2 -translate-y-1/2 transform")}
          onClick={togglePasswordVisibility}>
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-slate-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-slate-400" />
          )}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
