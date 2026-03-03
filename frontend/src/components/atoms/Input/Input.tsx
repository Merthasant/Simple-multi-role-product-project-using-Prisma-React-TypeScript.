import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "success" | "danger";
  fullWidth?: boolean;
}

const variantStyles = {
  default: "border",
  success: "border",
  danger: "border border-destructive",
};

export default function Input({
  variant = "default",
  fullWidth = true,
  className = "",
  ...props
}: InputProps) {
  const baseStyles =
    "px-4 py-2 rounded focus:outline-none transition-all focus:ring-2 focus:ring-ring";
  const variantClass = variantStyles[variant];
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <input
      className={`${baseStyles} ${variantClass} ${widthClass} ${className}`}
      {...props}
    />
  );
}
