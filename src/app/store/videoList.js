import { create } from "zustand";

const useVideosListStore = create((set) => ({
  videoList: null,
  setVideoList: (videoList) => set({ videoList }),
  
}));

export default useVideosListStore;
