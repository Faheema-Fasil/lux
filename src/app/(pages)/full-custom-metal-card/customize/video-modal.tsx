"use client";

import { extractVimeoId } from "@/helper/helper";
import { motion } from "framer-motion";
import React, { useState } from "react";

const VideoModal = ({ bannerVideo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-background") {
      closeModal();
    }
  };

  if (!bannerVideo) {
    return null;
  }

  return (
    <>
        <button
        className="play-button bg-white/50 rounded-full p-1 mt-5 shadow-lg focus:outline-none"
        onClick={openModal}
      >
        <div className="relative flex justify-center items-center w-14 h-14">
          <div className="pulsing"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-black absolute"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-4.197-2.42A1 1 0 009 9.634v4.732a1 1 0 001.555.832l4.197-2.42a1 1 0 000-1.664z"
            />
          </svg>
        </div>
      </button>

      {isModalOpen && (
        <motion.div
          id="modal-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1, transition: { duration: 0.5 } }}
            exit={{ scale: 0.5, transition: { duration: 0.5 } }}
            className="bg-white rounded-lg overflow-hidden shadow-lg relative w-[90vw] h-auto md:w-[70vw] lg:w-[60vw] aspect-video"
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
            >
              ✕
            </button>
            <iframe
              src={`https://player.vimeo.com/video/${extractVimeoId(
                bannerVideo
              )}?background=1&autoplay=1&loop=1&muted=1&controls=1&title=0&byline=0&portrait=0`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Background Video"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default VideoModal;

