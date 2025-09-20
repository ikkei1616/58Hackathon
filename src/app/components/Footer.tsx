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

export default function Footer(): JSX.Element {
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isClient && item.href === pathname;
          
          const content = (
            <>
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </>
          );

          return item.href ? (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {content}
            </Link>
          ) : (
            <div
              key={index}
              className="flex flex-col items-center py-2 px-4 rounded-xl text-gray-500"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}