"use client";
import Banner from "@/components/common/banner";
import React from "react";

const DualChipBanner = ({ contentData }: any) => {
  return (
    <Banner
      bannerImage={contentData?.acf.our_products_page_banner_image?.url}
      bannerTagline={contentData?.acf.our_products_page_banner_tagline}
      bannerDescription={contentData?.acf.our_products_page_banner_description}
      bannerVideo={contentData?.acf.our_products_page_banner_video?.url}
    />
  );
};

export default DualChipBanner;
