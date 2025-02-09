import { fetchBusinessCardData } from "@/server-api/apifunctions/apiService";
import BusinessCard from "@/shared-pages/business-card";
import React from "react";
import { Fragment } from "react";

export const metadata = {
  title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
  description:
    "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
  openGraph: {
    title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
    description:
      "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
    url: "https://www.luxmetallic.com/",
    images: [
      {
        url: "/assets/img/logo.png",
        alt: "Luxmetallic Logo",
      },
    ],
    type: "website",
  },
};

const BusinessCardPage = async () => {
  const data = await fetchBusinessCardData();
  // const features = await fetchBusinessCardFeatures();
  // const metalNfcFeaturesGrid = await fetchMetalNfcCardFeaturesGrid();
  // const metalNfcFeaturesCol = await fetchMetalNfcCardFeaturesColumn();

  return (
    <Fragment>
      <BusinessCard data={data.contentData} features={data.featuresData} />
    </Fragment>
  );
};

export default BusinessCardPage;
