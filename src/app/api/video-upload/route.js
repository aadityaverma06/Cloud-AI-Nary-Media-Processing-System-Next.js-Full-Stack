import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

    const formData = await req.formData();
    const video = formData.get("video");

    if (!video)
      return NextResponse.json({ error: "No Video Found", status: 400 });

    const arrayBuffer = await video.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await new Promise((resolve, reject) => {
      const videoUploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "Cloud-AI-Nary/Videos",
          transformation: [
            {
              quality: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
      videoUploadStream.end(buffer);
    });

    const newVideo = await prisma.video.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
        publicId: response.public_id,
        url: String(response.secure_url),
        originalSize: parseInt(formData.get("originalSize")),
        compressedSize: parseInt(response.bytes),
        duration: String(response.duration),
      },
    });
    return NextResponse.json({ newVideo, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
