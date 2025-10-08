"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CldImage } from "next-cloudinary";

function SocialImages() {
  const socialFormats = {
    "Instagram Square (1:1)": { width: 1080, height: 1080 },
    "Instagram Portrait (4:5)": {
      width: 1080,
      height: 1350,
    },
    "X Post (16:9)": { width: 1200, height: 675 },
    "X Header (3:1)": { width: 1500, height: 500 },
    "Meta Cover (205:78)": {
      width: 820,
      height: 312,
    },
  };

  const [isTransforming, setIsTransforming] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(
    "Instagram Square (1:1)"
  );
  const [imagePublicId, setImagePublicId] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isFirstRender) return;
    setIsTransforming(true);
  }, [selectedFormat]);

  async function handleImageUpload(image) {
    try {
      setIsImageLoaded(false);
      setImage(image);
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("/api/image-upload", formData);

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }
      setIsFirstRender(false);
      setIsTransforming(true);
      setImagePublicId(response.data.response.public_id);
      toast.success("Image Uploaded successfully");
      setIsImageLoaded(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  }
  const handleImageDownload = () => {
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    toast.success("Downloading Image...");
  };
  return (
    <div className="flex flex-col gap-16 items-center min-h-screen text-[#d1d5dc] bg-base-300 pb-8">
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-2xl md:text-3xl pt-12 font-bold">
          Social Media{" "}
          <span className="bg-clip-text font-bold bg-gradient-to-r text-transparent  from-orange-500 via-pink-600 to-purple-600">
            AI
          </span>{" "}
          Image Creator
        </h2>
      </div>
      <div className="flex flex-col gap-12 w-[85%] sm:w-[70%]">
        <div className="flex flex-col gap-4">
          <h3 className="text-base sm:text-lg md:text-2xl font-bold"> Upload an Image</h3>
          <input
            type="file"
            className="file:bg-[#605dfe] file:text-[#1a1a1a] cursor-pointer file:px-4 file:py-3 file:font-bold rounded-lg border-1 border-[#605dfe] bg-gray-700/30 text-sm sm:text-lg"
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
        </div>
        {isUploading && (
          <progress className="progress progress-primary w-full mt-4"></progress>
        )}
        {isImageLoaded && (
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h3 className="text-base sm:text-lg md:text-2xl font-bold">
                {" "}
                Select a social Media Image Format
              </h3>
              <select
                className="select select-primary w-full select-lg cursor-pointer"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
            {imagePublicId && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base sm:text-lg md:text-2xl font-bold"> Image Preview</h3>
                <div className="relative">
                  {isTransforming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-base-100 opacity-70 z-10">
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={imagePublicId}
                    sizes="100vw"
                    alt={selectedFormat}
                    crop="fill"
                    gravity="auto"
                    onLoad={() => setIsTransforming(false)}
                    ref={imageRef}
                    className=" shadow-[0_0_20px_0_rgba(0,0,0,0.6)] rounded-xl"
                  />
                </div>
                {!isTransforming && (
                  <button
                    className="btn btn-outline btn-primary w-max rounded-xl text-sm sm:text-base md:text-lg mt-4"
                    onClick={handleImageDownload}
                  >
                    Download For {selectedFormat}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialImages;
