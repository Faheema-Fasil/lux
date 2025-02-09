"use client";
import { BannerProps } from "@/types/homepage/home";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const BannerComponent: React.FC<BannerProps> = ({ titles }: any) => {
  // if (!titles || !titles.titles) {
  //   console.error("Missing or invalid `titles` prop:", titles);
  //   return null;
  // }

  const {
    card_category_tagline,
    heroBannerVideo,
    hero_banner_description,
    hero_banner_button_1_text,
    hero_banner_button_2_text,
  } = titles.titles;

  // Animation Variants
  const videoVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-black -mt-[100px] p-0 relative h-screen flex items-center justify-center">
      {/* Video with Animation */}
      <motion.div
        className="absolute inset-0 z-0 h-full w-full overflow-hidden"
        variants={videoVariants}
        initial="hidden"
        animate="visible"
      >
        {heroBannerVideo && (
          <motion.video
            src='/final.mp4'
            // src={heroBannerVideo}
            className="w-full h-full object-cover"
            autoPlay
            loop
            playsInline
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          className="mx-auto pt-[150px] max-w-[1200px]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Headline */}
          <motion.h1
            className="tracking-normal text-[40px] md:text-[40px] font-bold leading-tight md:leading-[40px] mb-4"
            variants={itemVariants}
          >
            {card_category_tagline && card_category_tagline || "Create Your Unique Metal Card"}
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] mt-4 font-light leading-relaxed"
            variants={itemVariants}
          >
            {hero_banner_description && hero_banner_description || "Tell us your story and we'll make it shine!"}
          </motion.p>

          {/* Buttons */}
          <motion.div className="flex flex-wrap justify-center gap-4 items-center mt-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Link
                href="/gallery"
                className="bg-primary text-white border border-primary rounded-full py-[12px] px-[40px] sm:px-[50px] font-medium uppercase text-sm sm:text-base transition duration-300 ease-in-out hover:bg-primary/40 hover:text-white"
              >
                {hero_banner_button_1_text && hero_banner_button_1_text || "Get Started"}
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/about-us"
                className="border border-white rounded-full py-[12px] px-[40px] sm:px-[50px] font-medium uppercase text-sm sm:text-base transition duration-300 ease-in-out hover:bg-black hover:text-white"
              >
                {hero_banner_button_2_text && hero_banner_button_2_text || "Explore Us"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerComponent;
