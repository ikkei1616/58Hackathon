"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Shadcn/uiのモックUIコンポーネントのProps型定義
interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode;
  className: string;
}


// Lucide-ReactアイコンをインラインSVGとして定義
const ArrowLeft: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);


const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={`p-2 rounded-xl text-sm font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className="mr-3 rounded-full bg-white/50 hover:bg-white/80 transition-all text-gray-800 cursor-pointer"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft size={20} />
    </Button>
  );
};

export default BackButton;
