"use client";
import { useUser } from "@clerk/clerk-react";
import { useClerk } from "@clerk/nextjs";
import { IconUserPlus, IconLogin2, IconLogout2 } from "@tabler/icons-react";

import Link from "next/link";
import toast from "react-hot-toast";
export default function Home() {
  const { user } = useUser();
 const { signout } = useClerk();
  return (
    <div className="flex flex-col min-h-screen p-5 xs:p-10 font-[family-name:var(--font-geist-sans)] justify-center items-center gap-12">
      <main className="flex flex-col gap-[32px] row-start-2 items-center max-w-[520px]">
        <div className="flex flex-col gap-[32px] row-start-2 items-center justify-center pr-4">
          <h1 className="text-4xl font-extrabold md:text-5xl lg:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 leading-[1.25]">
            Welcome to Cloud - AI - Nary
          </h1>
        </div>

        <ol className="list-outside list-disc text-base/6 text-left font-[family-name:var(--font-geist-mono)] pl-6 space-y-6 text-gray-300">
          <li className="tracking-[-.01em]">
            Get started by logging into your account, or create a new one if not
            an existing user.
          </li>
          <li className="tracking-[-.01em]">
            Upload images and let{" "}
            <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
              AI
            </span>{" "}
            automatically crop them according to prominent details (like face,
            text etc.) optimized for social platforms like Instagram, X,
            Meta etc.
          </li>
          <li className="tracking-[-.01em]">
            Compress your Videos effortlessly using{" "}
            <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
              AI
            </span>{" "}
            for faster sharing and storage.
          </li>
          <li className="tracking-[-.01em]">
            Explore videos uploaded by other users and discover trending content
            without the need to sign up.
          </li>
        </ol>
        {user ? (
          <div className="flex gap-4 items-center flex-col sm:flex-row sm:justify-between sm:w-full">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding from-orange-600 via-pink-700 to-purple-700 gap-2 hover:from-orange-700 hover:via-pink-800 hover:to-purple-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto w-full"
              href="/home"
            >
              Explore Now
            </Link>

            <button
              className="btn btn-outline btn-primary !rounded-full p-5 w-max"
              onClick={async () => {
                try {
                  await signout();
                  toast.success("Logged out successfully");
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              <IconLogout2 size={20} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-col sm:flex-row justify-between w-full px-2">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding from-orange-500 via-pink-600 to-purple-600 gap-2 hover:from-orange-600 hover:via-pink-700 hover:to-purple-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto w-full"
              href="/home"
            >
              Explore Now
            </Link>
            <div className="flex gap-4">
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center text-white bg-gradient-to-r bg-clip-padding from-[#6c17b7] to-[#4a00e0] gap-2 hover:bg-gradient-to-r hover:from-[#8d2de2ba] hover:to-[#4b00e0b2] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto order-3 sm:order-2"
                href="/login"
              >
                <IconLogin2 size={20} />
                Login
              </Link>
              <Link
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-max order-2 sm:order-3 gap-2"
                href="/signup"
              >
                <IconUserPlus size={20} />
                Signup
              </Link>
            </div>
          </div>
        )}
      </main>
      <footer className="text-center xs:text-left pr-4">
        © 2025 Cloud -{" "}
        <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
          AI
        </span>{" "}
        - Nary Media Utility System. All rights reserved.
      </footer>
    </div>
  );
}
