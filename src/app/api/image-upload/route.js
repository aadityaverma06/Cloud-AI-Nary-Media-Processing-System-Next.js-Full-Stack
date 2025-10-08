import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";


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
    const image = formData.get("image");

    if (!image)
      return NextResponse.json({ error: "No Image Found", status: 400 });

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await new Promise((resolve, reject) => {
      const imageUploadStream = cloudinary.uploader.upload_stream(
        { folder: "Cloud-AI-Nary/Images" },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
      imageUploadStream.end(buffer);
    });
    return NextResponse.json({ response, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
