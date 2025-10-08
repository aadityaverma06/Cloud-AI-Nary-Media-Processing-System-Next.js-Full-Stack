"use client";

import dateFormatter from "@/app/utils/dateFormatter";
import {
  IconFileDownload,
  IconFileUpload,
  IconDownload,
} from "@tabler/icons-react";
import { getCldVideoUrl, getCldImageUrl } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function VideoCard({ video }) {
  const [isHovered, setIsHovered] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  useEffect(() => {
    function getPreviewVideoUrl() {
      const preview = getCldVideoUrl({
        src: video.publicId,
        assetType: "video",
        rawTransformations: ["e_preview:duration_5:min_seg_dur_1"],
      });
      setPreviewUrl(preview);
    }
    getPreviewVideoUrl();
  }, []);

  useEffect(() => {
    let interval;
    async function checkVideo() {
      try {
        const response = await fetch(previewUrl, { method: "HEAD" });
        if (response.ok) {
          console.log("Video is ready!");
          setIsPreviewReady(true);
          clearInterval(interval);
        } else {
          console.log("Still processing...");
        }
      } catch (error) {
        console.log("Error checking video:", error);
      }
    }
    interval = setInterval(() => {
      setRetryCount((prev) => prev + 1);
      checkVideo();
    }, 2000);

    return () => clearInterval(interval);
  }, [previewUrl]);
  function handleVideoDownload(videoUrl) {
    fetch(videoUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    toast.success("Downloading Video...");
  }
  useEffect(() => {
    console.log(isPreviewReady);
    console.log(isHovered);
  }, [isPreviewReady, isHovered]);
  return (
    <div
      className="flex flex-col gap-4 w-[339px] xl:w-[393px] rounded-xl bg-gray-800/40 overflow-hidden shadow-[0_0_15px_0_rgba(0,0,0,0.6)] hover:translate-y-[-10px] transition duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={getCldImageUrl({
          src: video.publicId,
          assetType: "video",
        })}
        className={isHovered && isPreviewReady ? "hidden" : "block"}
      />
      {previewUrl && (
        <video
          key={`${previewUrl}-${isPreviewReady}`}
          src={previewUrl}
          className={isHovered && isPreviewReady ? "block" : "hidden"}
          autoPlay
          muted
          loop
        />
      )}
      <div className="flex flex-col gap-6 p-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl">{video.title}</h2>
          <h3 className="text-base text-gray-400">{video.description}</h3>
        </div>
        <p className="text-base text-right text-gray-400">{`Uploaded ${dateFormatter(
          video.createdAt
        )}`}</p>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <IconFileUpload size={30} color={"#605dfe"} />
            <div className="flex flex-col gap-2 text-sm">
              <p>Original</p>
              <p>
                {Math.floor(video.originalSize / (1024 * 1024)) == 0
                  ? `${(video.originalSize / 1024).toFixed(2)} KB`
                  : `${(video.originalSize / (1024 * 1024)).toFixed(2)} MB`}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <IconFileDownload size={30} color={"#f43098"} />
            <div className="flex flex-col gap-2 text-sm">
              <p>Compressed</p>
              <p>
                {Math.floor(video.compressedSize / (1024 * 1024)) == 0
                  ? `${(video.compressedSize / 1024).toFixed(2)} KB`
                  : `${(video.compressedSize / (1024 * 1024)).toFixed(2)} MB`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-base">
            Compression:{" "}
            <span className="text-[#2ec57a]">
              {`${(
                (1 - video.compressedSize / video.originalSize) *
                100
              ).toFixed(2)}%`}
            </span>
          </p>
          <button
            className="bg-[#605dfe] rounded-lg p-1 cursor-pointer hover:bg-[#605dfe]/80 transition duration-200"
            id={video.url}
            onClick={(e) => handleVideoDownload(e.currentTarget.id)}
          >
            <IconDownload size={20} color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
