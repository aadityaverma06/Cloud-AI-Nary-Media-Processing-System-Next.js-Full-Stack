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
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-3 md:gap-6 min-h-screen pt-4 lg:pl-4 bg-base-200 text-gray-300">
      <div className="col-start-1 row-start-1 flex justify-center items-start md:items-center pl-4 lg:pl-0">
        <IconLibraryPhoto
          size={45}
          color={"#605dfe"}
          className="cursor-pointer hidden md:block"
        />
        <IconLibraryPhoto
          size={35}
          color={"#605dfe"}
          className="cursor-pointer hidden sm:block md:hidden"
        />
        <IconLibraryPhoto
          size={25}
          color={"#605dfe"}
          className="cursor-pointer block sm:hidden"
        />
      </div>
      <div className="col-span-2 lg:col-span-1 col-start-1 row-start-2 flex flex-row lg:flex-col gap-2 sm:gap-4 justify-center lg:justify-start mt-6 md:mt-0">
        <NavLink href="/home">
          <IconHome size={30} color={"#d1d5dc"} className="hidden md:block" />
          <IconHome
            size={20}
            color={"#d1d5dc"}
            className="hidden sm:block md:hidden"
          />
          <IconHome size={15} color={"#d1d5dc"} className="block sm:hidden" />
          Home
        </NavLink>
        <NavLink href="/social-images">
          <IconShare size={30} color={"#d1d5dc"} className="hidden md:block" />
          <IconShare
            size={20}
            color={"#d1d5dc"}
            className="hidden sm:block md:hidden"
          />
          <IconShare size={15} color={"#d1d5dc"} className="block sm:hidden" />
          Social Images
        </NavLink>
        <NavLink href="/video-upload">
          <IconUpload size={30} color={"#d1d5dc"} className="hidden md:block" />
          <IconUpload
            size={20}
            color={"#d1d5dc"}
            className="hidden sm:block md:hidden"
          />
          <IconUpload size={15} color={"#d1d5dc"} className="block sm:hidden" />
          Video Upload
        </NavLink>
      </div>
      <div className="col-start-1 md:col-start-2 row-start-1 flex items-center gap-y-6 md:gap-y-0 md:justify-between flex-col md:flex-row md:pr-0 col-span-2 md:col-span-1">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer hover:bg-gray-800 transition duration-200 px-4 py-2 rounded-lg order-2 md:order-1 "
          onClick={() => router.push("/")}
        >
          Cloud -{" "}
          <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
            AI
          </span>{" "}
          - Nary
        </h1>
        {user ? (
          <div className="flex items-center md:justify-between gap-2 md:gap-4 pr-4 order-1 md:order-2 self-end md:self-center">
            <img
              src={user.imageUrl}
              className="w-5 h-5 sm:w-7 sm:h-7 lg:w-10 lg:h-10 rounded-full"
            />
            <h3 className="text-base md:text-xl">{userEmail}</h3>
            <IconLogout
              size={30}
              color={isLogoutButtonHovered ? "#605dfe" : "#605dfeb3"}
              onClick={handleLogout}
              className="cursor-pointer transition duration-200 hidden md:block"
              onMouseEnter={() => setIsLogoutButtonHovered(true)}
              onMouseLeave={() => setIsLogoutButtonHovered(false)}
            />
            <IconLogout
              size={20}
              color={isLogoutButtonHovered ? "#605dfe" : "#605dfeb3"}
              onClick={handleLogout}
              className="cursor-pointer transition duration-200 block md:hidden"
              onMouseEnter={() => setIsLogoutButtonHovered(true)}
              onMouseLeave={() => setIsLogoutButtonHovered(false)}
            />
          </div>
        ) : (
          <div className="flex gap-2 items-center text-base md:text-lg md:justify-between md:gap-4 pr-4 order-1 md:order-2 self-end md:self-center">
            <button
              className="btn btn-outline btn-primary w-max !rounded-xl"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="btn btn-outline btn-primary w-max !rounded-xl"
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </button>
          </div>
        )}
      </div>

      <div className="col-span-2 lg:col-span-1 col-start-1 lg:col-start-2 row-start-3 lg:row-start-2 bg-base-300 ">
        {children}
      </div>
    </div>
  );
}

export default Layout;
