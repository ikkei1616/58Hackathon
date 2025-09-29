"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft } from "lucide-react";



// Shadcn/uiのモックUIコンポーネントのProps型定義
interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className: string;
}


const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`p-2 rounded-xl text-sm font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="mr-3 rounded-full hover:bg-white/80 transition-all text-gray-800 cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft size={24} />
    </Button>
  );
};

export default BackButton;
