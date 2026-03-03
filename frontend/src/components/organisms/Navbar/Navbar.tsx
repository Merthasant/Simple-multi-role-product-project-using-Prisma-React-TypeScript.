import { type ReactNode } from "react";

interface NavbarProps {
  title: string;
  rightContent?: ReactNode;
  bgColor?: string;
}

export default function Navbar({
  title,
  rightContent,
  bgColor = "bg-sidebar",
}: NavbarProps) {
  return (
    <nav className={`${bgColor} shadow`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          {rightContent && (
            <div className="flex items-center">{rightContent}</div>
          )}
        </div>
      </div>
    </nav>
  );
}
