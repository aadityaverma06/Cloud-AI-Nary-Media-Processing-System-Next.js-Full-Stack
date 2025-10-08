
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req) {
  try {
    const VideoList = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(VideoList);
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
