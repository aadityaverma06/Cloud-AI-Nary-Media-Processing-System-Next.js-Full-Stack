"use client";
import React, { useState } from "react";

import {
  IconLibraryPhoto,
  IconLogout,
  IconHome,
  IconUpload,
  IconShare,
} from "@tabler/icons-react";
import { NavLink } from "@/app/utils/navLinkTag";
import { useUser } from "@clerk/clerk-react";
import { useSession } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
function Layout({ children }) {
  const { user } = useUser();
  const { session } = useSession();
  const [isLogoutButtonHovered, setIsLogoutButtonHovered] = useState(false);
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();
  async function handleLogout() {
    try {
      await session.end();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-6 min-h-screen pt-4 pl-4 bg-base-200 text-gray-300">
      <div className="col-start-1 row-start-1 flex justify-center items-center">
        <IconLibraryPhoto
          size={45}
          color={"#605dfe"}
          className="cursor-pointer"
        />
      </div>
      <div className="col-start-2 row-start-1 grid grid-cols-3 justify-items-end">
        <div></div>
        <h1
          className="text-3xl font-bold cursor-pointer hover:bg-gray-800 transition duration-200 px-4 py-2 rounded-lg"
          onClick={() => router.push("/")}
        >
          Cloud -{" "}
          <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
            AI
          </span>{" "}
          - Nary Showcase
        </h1>
        {user ? (
          <div className="flex items-center justify-between gap-4 pr-4">
            <img src={user.imageUrl} className="w-10 h-10 rounded-full" />
            <h3 className="text-xl">{userEmail}</h3>
            <IconLogout
              size={30}
              color={isLogoutButtonHovered ? "#605dfe" : "#605dfeb3"}
              onClick={handleLogout}
              className="cursor-pointer transition duration-200"
              onMouseEnter={() => setIsLogoutButtonHovered(true)}
              onMouseLeave={() => setIsLogoutButtonHovered(false)}
            />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <button
              className="btn btn-outline btn-primary w-max rounded-xl text-lg mr-4"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-outline btn-primary w-max rounded-xl text-lg mr-4"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </div>
      <div className="col-start-1 row-start-2 flex flex-col gap-4">
        <NavLink href="/home">
          <IconHome size={30} color={"#d1d5dc"} />
          Home
        </NavLink>
        <NavLink href="/social-images">
          <IconShare size={30} color={"#d1d5dc"} />
          Social Images
        </NavLink>
        <NavLink href="/video-upload">
          <IconUpload size={30} color={"#d1d5dc"} />
          Video Upload
        </NavLink>
      </div>
      <div className="col-start-2 row-start-2 bg-base-300 ">{children}</div>
    </div>
  );
}

export default Layout;
