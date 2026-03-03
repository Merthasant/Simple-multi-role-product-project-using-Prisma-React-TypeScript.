import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`bg-card rounded shadow hover:shadow-lg transition-shadow p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
