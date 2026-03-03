import React from "react";

interface BadgeProps {
  variant?: "success" | "pending" | "danger" | "info";
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  success: "bg-accent text-accent-foreground",
  pending: "bg-secondary text-secondary-foreground",
  danger: "bg-destructive text-destructive-foreground",
  info: "bg-primary text-primary-foreground",
};

export default function Badge({
  variant = "info",
  children,
  className = "",
}: BadgeProps) {
  const baseStyles = "px-2 py-1 rounded text-sm font-medium";
  const variantClass = variantStyles[variant];

  return (
    <span className={`${baseStyles} ${variantClass} ${className}`}>
      {children}
    </span>
  );
}
