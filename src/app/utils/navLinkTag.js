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
        "flex gap-4 px-4 py-2 transition duration-200 hover:bg-gray-700/30 rounded-lg text-xl items-center",
        isActive &&
          "bg-[#605dfe] text-foreground rounded-lg px-4 py-2 hover:bg-gray-800 transition duration-200 w-[100%]"
      )}
    >
      {children}
    </Link>
  );
}
