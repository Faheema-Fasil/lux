'use client'
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const HowItWorksCardImage = ( {photoUrl, link = true}: any ) => {
  return (
    <motion.div 
      className="animate-box mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 2 }}
    >
      <div className="text-center flex justify-center">
        {link ? (
          <Link href="/about-us">
            <motion.img
              src={photoUrl}
              alt=""
              className="mx-auto w-[150px] lg:w-[270px] 2xl:w-[300px]"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        ) : (
          <motion.img
            src={photoUrl}
            alt=""
            className="mx-auto w-[150px] lg:w-[270px] 2xl:w-[300px]"
          />
        )}
      </div>
    </motion.div>
  );
};

export default HowItWorksCardImage;
