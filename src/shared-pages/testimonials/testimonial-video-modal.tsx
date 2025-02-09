"use client";

import { extractVimeoId } from "@/helper/helper";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const VideoModal = ({ isOpen, closeModal, testimonialVideo }: any) => {

  if (!isOpen || !testimonialVideo) {
    return null;
  }

  const handleOutsideClick = (e: any) => {
    if (e.target.id === "modal-background") {
      closeModal();
    }
  };

  if (!testimonialVideo) {
    return null;
  }

  return (
    <>
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
              testimonialVideo
            )}?background=1&autoplay=1&loop=1&controls=1&title=0&byline=0&portrait=0&muted=0`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Background Video"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          ></iframe>
        </motion.div>
      </motion.div>
    </>
  );
};

export default VideoModal;
