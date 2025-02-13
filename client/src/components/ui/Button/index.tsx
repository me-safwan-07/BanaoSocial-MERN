import React, { forwardRef, Ref, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip";

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type ButtonBaseProps = {
  variant?: "highlight" | "primary" | "secondary" | "minimal" | "warn" | "alert" | "darkCTA";
  size?: "base" | "sm" | "lg" | "fab" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StartIcon?: SVGComponent;
  startIconClassName?: string;
  EndIcon?: SVGComponent;
  endIconClassName?: string;
  shallow?: boolean;
  tooltip?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  tooltipOffset?: number;
};

type ButtonProps = ButtonBaseProps &
  (
    | (Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & { href: string })
    | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & { href?: never })
  );

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      href,
      variant = "primary",
      size = "base",
      StartIcon,
      startIconClassName,
      EndIcon,
      endIconClassName,
      loading = false,
      tooltip,
      tooltipSide = "top",
      tooltipOffset = 4,
      disabled,
      className,
      onClick,
      children,
      ...rest
    } = props;

    const isLink = typeof href !== "undefined";

    const element = isLink ? (
      <a
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onClick={!disabled && !loading ? onClick : undefined}
        className={cn(
          "inline-flex items-center appearance-none",
          size === "sm" && "px-3 py-2 text-sm leading-4 font-medium rounded-md",
          size === "base" && "px-6 py-3 text-sm font-medium rounded-md",
          size === "lg" && "px-8 py-4 text-base font-medium rounded-md",
          size === "icon" && "w-10 h-10 justify-center group p-2 rounded-lg",
          variant === "primary" && "text-white bg-blue-500 hover:bg-blue-600",
          variant === "secondary" && "text-gray-700 bg-gray-200 hover:bg-gray-300",
          loading && "cursor-wait",
          disabled && "cursor-not-allowed",
          className
        )}>
        {StartIcon && (
          <StartIcon
            className={cn("flex", size === "icon" ? "h-4 w-4" : "-ml-1 mr-1 h-3 w-3", startIconClassName || "")}
          />
        )}
        {children}
        {loading && (
          <span className="ml-2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {EndIcon && <EndIcon className={cn("ml-2 h-5 w-5", endIconClassName || "")} />}
      </a>
    ) : (
      <button
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        onClick={!disabled && !loading ? onClick : undefined}
        className={cn(
          "inline-flex items-center appearance-none",
          size === "sm" && "px-3 py-2 text-sm leading-4 font-medium rounded-md",
          size === "base" && "px-6 py-3 text-sm font-medium rounded-md",
          size === "lg" && "px-8 py-4 text-base font-medium rounded-md",
          size === "icon" && "w-10 h-10 justify-center group p-2 rounded-lg",
          variant === "primary" && "text-white bg-blue-500 hover:bg-blue-600",
          variant === "secondary" && "text-gray-700 bg-gray-200 hover:bg-gray-300",
          loading && "cursor-wait",
          disabled && "cursor-not-allowed",
          className
        )}>
        {StartIcon && (
          <StartIcon
            className={cn("flex", size === "icon" ? "h-4 w-4" : "-ml-1 mr-1 h-3 w-3", startIconClassName || "")}
          />
        )}
        {children}
        {loading && (
          <span className="ml-2">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {EndIcon && <EndIcon className={cn("ml-2 h-5 w-5", endIconClassName || "")} />}
      </button>
    );

    return tooltip ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{element}</TooltipTrigger>
          <TooltipContent side={tooltipSide} sideOffset={tooltipOffset}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      element
    );
  }
);

Button.displayName = "Button";

export default Button;
