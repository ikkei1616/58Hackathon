"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, User } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
}

export default function Footer() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems: NavItem[] = [
    { href: "/books", icon: List, label: "要約一覧" },
    { href: "/", icon: Home, label: "ホーム" },
    { icon: User, label: "アカウント" }, // hrefなし
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-100 px-4 py-3 shadow-2xl shadow-green-100/50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isClient && item.href === pathname;
          
          const content = (
            <>
              <Icon size={22} className="mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </>
          );

          return item.href ? (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-[#16A34A]/10 text-[#16A34A] shadow-lg shadow-green-100/50 scale-105"
                  : "text-gray-500 hover:text-[#16A34A] hover:bg-green-50/50 hover:scale-105"
              }`}
            >
              {content}
            </Link>
          ) : (
            <div
              key={index}
              className="flex flex-col items-center py-3 px-4 rounded-2xl text-gray-400 hover:text-gray-500 hover:bg-gray-50/50 transition-all duration-200"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}