import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/login", "/signup", "/", "/home"]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth, req) => {
  const {userId}  = await auth();
  const currentRoute = req.nextUrl.pathname;
  const ishomePage = currentRoute === "/home";

  if (userId && isPublicRoute(req) && !ishomePage) {
    return NextResponse.redirect(`${req.nextUrl.origin}/home`);
  }
 
  if (!userId) {
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(`${req.nextUrl.origin}/login`);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/home",
    "/login",
    "/signup",
    "/social-images",
    "/api/:path*",
    "/video-upload",
  ],
};
