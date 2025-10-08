"use client";

import useVideosListStore from "@/app/store/videoList";
import VideoCard from "@/components/VideoCard";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function Home() {
  const { videoList, setVideoList } = useVideosListStore();
  useEffect(() => {
    if (videoList) return;
    async function getVideos() {
      try {
        const videoList = await axios.get("/api/videos");
        if (videoList.data.error) {
          toast.error(videoList.data.error);
        }
        if (videoList.data.length === 0) toast.error("No Videos Found");
        else {
          toast.success("Videos Fetched Successfully");
        }
        setVideoList(videoList.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getVideos();
  }, []);

  return (
    <div className="min-h-screen p-8 flex flex-col gap-4 text-gray-300 relative">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
        {videoList === null || videoList?.length === 0
          ? "No Videos Found"
          : videoList?.length === 1
          ? "1 Video"
          : `${videoList?.length} Videos`}
      </h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {videoList != null ? (
          videoList.map((video) => (
            <VideoCard video={video} key={video.publicId} />
          ))
        ) : (
          <div className="absolute inset-x-8 top-24 bottom-0 flex items-center justify-center bg-base-100 opacity-70 z-10 ">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
