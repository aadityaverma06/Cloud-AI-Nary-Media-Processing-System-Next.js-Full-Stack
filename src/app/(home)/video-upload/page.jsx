"use client";

import useVideosListStore from "@/app/store/videoList";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null);
  const { videoList, setVideoList } = useVideosListStore();
  async function handleVideoFileUpload() {
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", videoFile.size);
    try {
      setIsUploading(true);
      const response = await axios.post("/api/video-upload", formData);

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      videoList == null
        ? setVideoList([response.data.newVideo])
        : setVideoList([response.data.newVideo, ...videoList]);

      toast.success("Video Uploaded successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
      setTitle("");
      setDescription("");
      setVideoFile(null);
      videoRef.current.value = null;
    }
  }

  return (
    <div className="max-h-screen p-10 text-gray-300">
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl pt-2 font-bold">Upload Video</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Title</legend>
          <input
            type="text"
            className="input input-lg w-full 
            !rounded-lg"
            placeholder="Enter Title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">Description</legend>
          <textarea
            className="textarea textarea-lg w-full rounded-xl"
            placeholder="Enter Description here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-lg">
            Video File (Max. Size: 15 MB)
          </legend>
          <input
            type="file"
            className="file:bg-[#605dfe] file:text-[#1a1a1a] cursor-pointer file:px-4 file:py-3 file:font-bold rounded-lg border-1 border-[#605dfe] bg-gray-700/30 text-lg"
            onChange={(e) => setVideoFile(e.target.files[0])}
            ref={videoRef}
          />
        </fieldset>
        {!isUploading && (
          <button
            className="btn btn-primary btn-outline w-max text-lg !rounded-lg"
            onClick={handleVideoFileUpload}
          >
            Upload Video
          </button>
        )}
        {isUploading && (
          <progress className="progress progress-primary w-full mt-4"></progress>
        )}
      </div>
    </div>
  );
}

export default VideoUpload;
