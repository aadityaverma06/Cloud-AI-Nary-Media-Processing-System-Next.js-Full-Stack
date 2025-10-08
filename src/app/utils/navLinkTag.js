"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "./cn";

export function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex gap-1 sm:gap-2 md:gap-4 px-2 py-1 lg:px-4 lg:py-2 transition duration-200 hover:bg-gray-700/30 rounded-lg text-sm sm:text-lg md:text-xl items-center",
        isActive &&
          "bg-[#605dfe] text-foreground rounded-lg px-2 py-1 lg:px-4 lg:py-2 hover:bg-gray-800 transition duration-200"
      )}
    >
      {children}
    </Link>
  );
}
