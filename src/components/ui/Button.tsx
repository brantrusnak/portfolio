"use client";

import { forwardRef } from "react";
import type { ReactNode } from "react";
import { ImSpinner9 } from "react-icons/im";
import clsx from "clsx";
import { GradientBorder } from "@/components/ui";

export interface ButtonProps {
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  variant?:
    | "default"
    | "outline"
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  title?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      onClick,
      active = false,
      variant = "default",
      size = "md",
      className = "",
      type = "button",
      disabled = false,
      loading = false,
      ariaLabel = "",
      title,
    },
    ref,
  ) => {
    const isIconOnly = variant === "icon";

    const sizeClasses = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm",
      lg: "px-6 py-2.5 text-sm sm:text-base",
    };

    const iconSizeClasses = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    };

    const variantClasses: Record<string, string> = {
      default: "bg-blue-600 text-white hover:brightness-90",
      outline: "bg-transparent border border-card-border hover:brightness-125",
      primary:
        "bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to text-white shadow-md hover:brightness-110",
      secondary: "bg-card text-white hover:brightness-125",
      danger: "bg-red-500 text-white hover:brightness-90",
      ghost: "bg-transparent text-white opacity-60 hover:opacity-100",
      icon: "bg-card rounded-full flex items-center justify-center text-white hover:brightness-125",
    };

    const buttonClasses = clsx(
      "relative font-medium transition-all duration-300 ease-in-out",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-opacity-50",
      "flex items-center justify-center gap-2",
      !isIconOnly && "rounded-md",
      isIconOnly && "rounded-full",
      isIconOnly ? iconSizeClasses[size] : sizeClasses[size],
      variantClasses[variant] || variantClasses.default,
      active && "shadow-lg",
      loading && "cursor-progress",
      disabled && "opacity-60 cursor-not-allowed",
      !isIconOnly && "w-full",
      className,
    );

    return (
      <GradientBorder
        isActive={active || isIconOnly}
        borderRadius={isIconOnly ? "rounded-full" : "rounded-md"}
        contentClasses={isIconOnly ? "h-full w-full" : "h-full"}
      >
        <button
          ref={ref}
          type={type}
          onClick={onClick}
          className={buttonClasses}
          aria-label={ariaLabel}
          aria-pressed={active}
          aria-disabled={disabled || loading}
          disabled={disabled || loading}
          tabIndex={disabled || loading ? -1 : 0}
          title={title}
        >
          {loading && (
            <span className="inline-block w-4 h-4 mr-2 animate-spin">
              <ImSpinner9 className="w-full h-full text-inherit" />
            </span>
          )}
          {leftIcon}
          {children}
          {rightIcon}
        </button>
      </GradientBorder>
    );
  },
);

Button.displayName = "Button";
