import VideoModal from "@/app/(pages)/full-custom-metal-card/customize/video-modal";
import Image from "next/image";
import React from "react";

const Banner = ({
  bannerImage,
  bannerTagline,
  bannerDescription,
  bannerVideo,
}: {
  bannerImage: string;
  bannerTagline: string;
  bannerDescription: string;
  bannerVideo?: string;
}) => {
  // const videoSrc = bannerImage.includes("youtube") ? "youtube" : bannerImage.includes("vimeo") ? "vimeo" : "video";
  
  return (
    <section className="bg-black relative flex items-center justify-center h-[500px] xl:h-[450px] 2xl:h-[500px] -mt-[100px] p-0">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Image src={bannerImage ? bannerImage : "/assets/img/shop-all/banner.png"} priority layout="fill" objectFit="cover" alt="Banner" />
      </div>
      <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[100px]">
        <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4 capitalize">{bannerTagline && bannerTagline}</h1>
        <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">{bannerDescription && bannerDescription}</p>
        {bannerVideo && <VideoModal bannerVideo={bannerVideo} />}
      </div>
    </section>
  );
};

export default Banner;
